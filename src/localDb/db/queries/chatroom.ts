import { Chatroom } from "src/shared/responseModels/Chatroom";
import { ChatroomRO } from "../../models/ChatroomRO";
import { CommunityRO } from "../../models/CommunityRO";
import { LastConversationRO } from "../../models/LastConversationRO";
import { MemberRO } from "../../models/MemberRO";
import {
  convertToChatroomRO,
  convertToCommunity,
  convertToMemberRO,
  convertToLastConversationRO,
  convertToConversationRO,
} from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { SyncChatroomResponse } from "src/sync/model/syncChatroomResponse";
import ChatDBUtil from "src/localDb/utils/chatDbUtils";
import { ConversationRO } from "src/localDb/models/ConversationRO";
import { Conversation } from "src/shared/responseModels/Conversation";
import LMResponse from "src/core/services/lmresponse";
import { Conversation as ConversationModel } from "src/shared/responseModels/Conversation";

// method to save chatroom data in realm
export async function saveChatroomResponse(
  data: SyncChatroomResponse,
  chatrooms: Chatroom[],
  communityId: string
) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const chatDBUtil = new ChatDBUtil();
      const community = data.communityMeta[communityId];
      if (!community) return;

      const communityRO = convertToCommunity(community);

      if (!communityRO) return;

      realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

      chatrooms.forEach((chatroom) => {
        const creatorId = chatroom.userId;
        const creator = data.userMeta[creatorId?.toString()];

        if (!creator) return;
        const chatroomCreatorRO = convertToMemberRO(creator, communityId);
        if (!chatroomCreatorRO) return;

        // insert or update chatroomCreatorRO
        realm.create(
          MemberRO.schema.name,
          chatroomCreatorRO,
          Realm.UpdateMode.All
        );

        const chatRequestedById = chatroom?.chatRequestedById;
        let chatRequestedByRO;
        if (chatRequestedById !== null) {
          const chatRequestedBy = data.userMeta[chatRequestedById?.toString()];
          chatRequestedByRO = convertToMemberRO(chatRequestedBy, communityId);
          if (chatRequestedByRO) {
            realm.create(
              MemberRO.schema.name,
              chatRequestedByRO,
              Realm.UpdateMode.All
            );
          }
        }

        const chatroomWithUserId = chatroom?.chatroomWithUserId;
        let chatroomWithUserRO;
        if (chatroomWithUserId !== null) {
          const chatroomWithUser =
            data.userMeta[chatroomWithUserId?.toString()];
          chatroomWithUserRO = convertToMemberRO(chatroomWithUser, communityId);
          if (chatroomWithUserRO) {
            realm.create(
              MemberRO.schema.name,
              chatroomWithUserRO,
              Realm.UpdateMode.All
            );
          }
        }

        // save lastConversation details
        const lastConversationId = chatroom.lastConversationId;
        const lastConversation =
          data.conversationMeta[lastConversationId?.toString()];

        if (!lastConversation) return;

        const lastConversationDeletedByMemberRO =
          lastConversation.deletedBy != null
            ? convertToMemberRO(
                data.userMeta[lastConversation.deletedBy],
                communityId
              )
            : null;

        // save lastConversation polls
        const lastConversationPolls = chatDBUtil.isPoll(lastConversation.state)
          ? data.convPollsMeta[lastConversationId?.toString()]
          : [];

        // save lastConversation attachments
        const lastConversationAttachment =
          lastConversation.attachmentCount > 0
            ? data.convAttachmentsMeta[lastConversationId?.toString()]
            : [];

        const lastConversationCreatorId = lastConversation.userId;
        const lastConversationCreator =
          data.userMeta[lastConversationCreatorId?.toString()];
        if (!lastConversationCreator) return;

        const lastConversationCreatorRO = convertToMemberRO(
          lastConversationCreator,
          communityId
        );

        if (!lastConversationCreatorRO) return;

        const conversationRO = convertToConversationRO(
          realm,
          lastConversation,
          lastConversationCreatorRO,
          chatroom?.id,
          lastConversationAttachment,
          lastConversationPolls
        );

        realm.create(
          ConversationRO.schema.name,
          conversationRO,
          Realm.UpdateMode.All
        );

        const lastConversationRO = convertToLastConversationRO(
          lastConversation,
          lastConversationCreatorRO,
          chatroom?.id,
          lastConversationAttachment,
          lastConversationDeletedByMemberRO
        );

        if (!lastConversationRO) return;

        realm.create(
          LastConversationRO.schema.name,
          lastConversationRO,
          Realm.UpdateMode.All
        );

        realm.create(
          MemberRO.schema.name,
          lastConversationCreatorRO,
          Realm.UpdateMode.All
        );

        const lastSeenConversationId = chatroom.lastSeenConversationId;
        const lastSeenConversation =
          data.conversationMeta[lastSeenConversationId?.toString()];
        let lastSeenConversationRO = undefined;

        if (!lastSeenConversation) {
          // get single conversation
          const conversations = realm.objects(ConversationRO.schema.name);
          const conversation = conversations.filtered(
            `id = "${lastSeenConversationId}"`
          );
          const singleConversation: Conversation = conversation.map((item) => {
            const stringifiedConversation = JSON.stringify(item);
            return {
              ...JSON.parse(stringifiedConversation),
            };
          })[0];

          if (singleConversation) {
            const lastSeenConversationCreatorRO = convertToMemberRO(
              singleConversation?.member,
              singleConversation?.communityId
            );

            const lastSeenConversationDeletedByMemberRO =
              !!lastSeenConversation?.deletedBy
                ? convertToMemberRO(
                    data.userMeta[lastSeenConversation.deletedBy],
                    communityId
                  )
                : null;

            let lastSeenConversationRO = convertToLastConversationRO(
              singleConversation,
              lastSeenConversationCreatorRO,
              singleConversation?.chatroomId?.toString(),
              singleConversation?.attachments,
              lastSeenConversationDeletedByMemberRO
            );

            if (lastSeenConversationRO) {
              realm.create(
                ConversationRO.schema.name,
                lastSeenConversationRO,
                Realm.UpdateMode.All
              );
            }
          }
        }

        if (lastSeenConversationId && lastSeenConversation) {
          const lastSeenConversationCreator =
            data.userMeta[lastSeenConversation?.userId?.toString()];

          const lastSeenConversationCreatorRO = convertToMemberRO(
            lastSeenConversationCreator,
            communityId
          );

          const lastSeenConversationDeletedByMemberRO =
            !!lastSeenConversation?.deletedBy
              ? convertToMemberRO(
                  data.userMeta[lastSeenConversation.deletedBy],
                  communityId
                )
              : null;

          const lastSeenConversationPolls = chatDBUtil.isPoll(
            lastSeenConversation?.state || 0
          )
            ? (
                data?.convPollsMeta[lastSeenConversationId?.toString()] || []
              ).map((poll: any) => {
                let pollObject = { ...poll };
                const user = data?.userMeta[poll.userId];
                pollObject.member = user;
                return pollObject;
              })
            : null;

          const lastSeenConversationAttachments =
            lastSeenConversation.attachmentCount > 0
              ? data.convAttachmentsMeta[lastSeenConversationId?.toString()]
              : [];

          lastSeenConversationRO = convertToLastConversationRO(
            lastSeenConversation,
            lastSeenConversationCreatorRO,
            chatroom?.id,
            lastSeenConversationAttachments,
            lastSeenConversationDeletedByMemberRO
          );

          if (lastSeenConversationRO) {
            realm.create(
              ConversationRO.schema.name,
              lastSeenConversationRO,
              Realm.UpdateMode.All
            );
          }
          if (lastSeenConversationCreatorRO) {
            realm.create(
              MemberRO.schema.name,
              lastSeenConversationCreatorRO,
              Realm.UpdateMode.All
            );
          }
        }

        // convert to ChatroomRO
        const chatroomRO = convertToChatroomRO(
          realm,
          chatroom,
          chatroomCreatorRO,
          chatroomWithUserRO,
          chatRequestedByRO,
          lastConversationRO
        );

        // save to local DB
        if (chatroomRO) {
          chatroomRO.relationshipNeeded = true;
          realm.create(
            ChatroomRO.schema.name,
            chatroomRO,
            Realm.UpdateMode.All
          );
        }

        let chatroomTopic = data?.conversationMeta[chatroom?.topicId];
        if (chatroomTopic) {
          if (chatroomTopic?.hasFiles == true) {
            chatroomTopic.attachments =
              data?.convAttachmentsMeta[chatroom?.topicId];
          }
          if (chatroomTopic?.state == 10) {
            chatroomTopic.polls = data?.convPollsMeta[chatroom?.topicId];
          }
          const items = realm.objects<ChatroomRO>(ChatroomRO.schema.name);
          const chatroomRo = items.filtered(`id = "${chatroom?.id}"`);
          const memberRO = convertToMemberRO(
            chatroomTopic?.member,
            chatroomTopic?.communityId
          );
          const conversationRO = convertToConversationRO(
            realm,
            chatroomTopic,
            memberRO,
            chatroom?.id,
            chatroomTopic?.attachments,
            chatroomTopic?.polls,
            chatroomTopic?.reactions
          );
          (chatroomRo[0].topic = conversationRO),
            (chatroomRo[0].topicId = chatroomTopic?.id?.toString());
        }
      });
    });
  } finally {
    realm.close();
  }
}

// To get chatroom filtered based on DMFeed or GroupFeed
export async function getFilteredChatrooms(isDm: boolean) {
  const realm = new Realm(Db.getInstance());
  try {
    const items = realm.objects(ChatroomRO.schema.name);
    const filteredAndSortedChatroom = isDm
      ? items
          .filtered(
            `(type = 10) && (followStatus=true) && (totalResponseCount>0) && (deletedBy == null)`
          )
          .sorted("updatedAt", true)
      : items
          .filtered(
            `(type = 0 || type=7) && (followStatus=true) && (deletedBy == null)`
          )
          .sorted("updatedAt", true);
    const stringifiedChatroom = JSON.parse(
      JSON.stringify(filteredAndSortedChatroom)
    );
    return stringifiedChatroom;
  } finally {
    realm.close();
  }
}

// To get chatroom data from Realm
export async function getChatrooms() {
  const realm = new Realm(Db.getInstance());
  try {
    const chatrooms = realm.objects(ChatroomRO.schema.name);
    const listOfChatroomObject = chatrooms.map((chatroom) => {
      const stringifiedChatroom = JSON.stringify(chatroom);
      return {
        ...JSON.parse(stringifiedChatroom),
      };
    });
    return listOfChatroomObject;
  } finally {
    realm.close();
  }
}

// To fetch one chatroom details from Realm
export async function getChatroom(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const items = realm.objects<ChatroomRO>(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    const stringifiedChatroom = JSON.parse(JSON.stringify(chatroom));
    return new LMResponse<Chatroom>(stringifiedChatroom[0], null, true);
  } finally {
    realm.close();
  }
}

// Updation of chat request state in Realm
export async function updateChatRequestState(
  chatroomId: string,
  chatRequestState: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      chatroom[0].chatRequestState = chatRequestState;
    });
  } finally {
    realm.close();
  }
}

// Updation of chatroom follow status in Realm
export async function updateChatroomFollowStatus(
  chatroomId: string,
  followStatus: boolean
) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      chatroom[0].followStatus = followStatus;
    });
  } finally {
    realm.close();
  }
}

// Updation of isChatroomViewed in Realm
export async function updateChatroomViewed(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      chatroom[0].isChatroomVisited = true;
    });
  } finally {
    realm.close();
  }
}

// Updation of unseen count in Realm
export async function updateUnseenCount(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      chatroom[0].unseenCount = 0;
    });
  } finally {
    realm.close();
  }
}

// Updation of mute status in Realm
export async function updateMuteStatus(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      chatroom[0].muteStatus = !chatroom[0]?.muteStatus;
    });
  } finally {
    realm.close();
  }
}

export async function updateChatroomTopic(
  chatroomId: string,
  topic: Conversation
) {
  const realm = new Realm(Db.getInstance());
  try {
    const items = realm.objects<ChatroomRO>(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    const memberRO = convertToMemberRO(topic?.member, topic?.communityId);
    const conversationRO = convertToConversationRO(
      realm,
      topic,
      memberRO,
      chatroomId,
      topic?.attachments,
      topic?.polls,
      topic?.reactions
    );
    realm.write(() => {
      (chatroom[0].topic = conversationRO),
        (chatroom[0].topicId = topic?.id?.toString());
    });
  } finally {
    realm.close();
  }
}

export async function deleteChatroomTopic(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const items = realm.objects<ChatroomRO>(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      (chatroom[0].topic = null), (chatroom[0].topicId = null);
    });
  } finally {
    realm.close();
  }
}

export async function getUnreadChatrooms(
  chatroom: Chatroom,
  lastConversation: ConversationModel
): Promise<LMResponse<ChatroomRO[]>> {
  const realm = new Realm(Db.getInstance());
  try {

    const chatroomWithID = realm
      .objects<ChatroomRO>(ChatroomRO.schema.name)
      .filtered(`id = "${chatroom.id}"`);

    if (chatroomWithID?.length > 0) {
      realm.write(() => {
        const convertedMemberRO = convertToMemberRO(lastConversation.member, chatroom.communityId)
        const convertedLastConversationRO = convertToLastConversationRO(lastConversation, convertedMemberRO, chatroom.id, lastConversation.attachments, null)
        const convertedConversationRO = convertToConversationRO(realm, lastConversation, convertedMemberRO, chatroom.id, lastConversation.attachments)

        realm.create(
          MemberRO.schema.name,
          convertedMemberRO,
          Realm.UpdateMode.All
        );
        
        realm.create(
          ConversationRO.schema.name,
          convertedConversationRO,
          Realm.UpdateMode.All
        );


        realm.create(
          LastConversationRO.schema.name,
          convertedLastConversationRO,
          Realm.UpdateMode.All
        );


          chatroomWithID[0].lastConversation = convertedConversationRO;
          chatroomWithID[0].lastConversationRO = convertedLastConversationRO;
          chatroomWithID[0].unseenCount = chatroomWithID[0].unseenCount + 1;
          chatroomWithID[0].unreadConversationsCount = chatroomWithID[0].unreadConversationsCount + 1;
          chatroomWithID[0].lastConversationId = lastConversation.id;
      })

      const chatrooms = realm.objects<ChatroomRO>(ChatroomRO.schema.name) // Get all chatroom objects
        .filtered(
          'followStatus == true AND muteStatus == false AND unseenCount > 0' // Apply filters
        )
        .sorted('lastConversationRO.createdEpoch', true) // Sort in descending order
        .slice(0, 7); // Limit the result to 7 chatrooms

      const stringifiedChatroom: ChatroomRO[] = JSON.parse(JSON.stringify(chatrooms));
      return new LMResponse<ChatroomRO[]>(stringifiedChatroom, null, true);

    } else {

      realm.write(() => {

        // Chatroom doesn't exist in DB
        const chatroomCreatorRO = convertToMemberRO(chatroom.member, chatroom.communityId);

        const chatRequestedByRO = convertToMemberRO(lastConversation.member, chatroom.communityId);

        const chatroomWithUserRO = convertToMemberRO(chatroom.chatroomWithUser, chatroom.communityId);

        const conversationRO = convertToConversationRO(
          realm,
          lastConversation,
          chatRequestedByRO,
          chatroom?.id,
          lastConversation.attachments
        );

        const lastConversationRO = convertToLastConversationRO(
          lastConversation,
          chatRequestedByRO,
          chatroom?.id,
          lastConversation.attachments,
          null
        );

        const chatroomRO = convertToChatroomRO(
          realm,
          chatroom,
          chatroomCreatorRO,
          chatroomWithUserRO,
          chatRequestedByRO,
          lastConversationRO
        );

        // insert or update chatroomCreatorRO
        realm.create(
          MemberRO.schema.name,
          chatroomCreatorRO,
          Realm.UpdateMode.All
        );
        


        realm.create(
           MemberRO.schema.name,
           chatRequestedByRO,
           Realm.UpdateMode.All
        );

        
        realm.create(
          MemberRO.schema.name,
          chatroomWithUserRO,
          Realm.UpdateMode.All
        );


        realm.create(
          ConversationRO.schema.name,
          conversationRO,
          Realm.UpdateMode.All
        );

        
        realm.create(
          LastConversationRO.schema.name,
          lastConversationRO,
          Realm.UpdateMode.All
        );


          chatroomRO.lastConversation = conversationRO;
          chatroomRO.lastConversationRO = lastConversationRO;
          chatroomRO.unseenCount = 1;
          chatroomRO.unreadConversationsCount = 1;
          chatroomRO.lastConversationId = lastConversation.id;

        // save to local DB
        if (chatroomRO) {
          chatroomRO.relationshipNeeded = true;
          realm.create(
            ChatroomRO.schema.name,
            chatroomRO,
            Realm.UpdateMode.All
          );
        }
      })


      const chatrooms = realm.objects<ChatroomRO>(ChatroomRO.schema.name) // Get all chatroom objects
        .filtered(
          'followStatus == true AND muteStatus == false AND unseenCount > 0' // Apply filters
        )
        .sorted('lastConversationRO.createdEpoch', true) // Sort in descending order
        .slice(0, 7); // Limit the result to 7 chatrooms

      const stringifiedChatroom: ChatroomRO[] = JSON.parse(JSON.stringify(chatrooms ?? []));
      return new LMResponse<ChatroomRO[]>(stringifiedChatroom, null, true);

    }
  } finally {
    realm.close();
    }
}