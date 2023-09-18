import { Chatroom } from "../../shared/responseModels/Chatroom";
import { Conversation } from "../../shared/responseModels/Conversation";
import { AttachmentRO } from "../Models/AttachmentRO";
import { ChatroomRO } from "../Models/ChatroomRO";
import { CommunityRO } from "../Models/CommunityRO";
import { ConversationRO } from "../Models/ConversationRO";
import { LastConversationRO } from "../Models/LastConversationRO";
import { MemberRO } from "../Models/MemberRO";
import { PollRO } from "../Models/PollRO";
import { ReactionRO } from "../Models/ReactionRO";
import { TimeStampRO } from "../Models/TimeStampRO";
import {
  convertToChatroomRO,
  convertCommunity,
  convertToMemberRO,
  convertToLastConversationRO,
  convertToConversationRO,
  convertToPollRO,
  convertToAttachmentRO,
  convertToTimeStampRO,
} from "./ROConverter";
import Db from "./db";
import Realm from "realm";
import { Observable } from "rxjs";

// method to save the community data in realm
export function saveCommunityData(communityData: any) {
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    let community = convertCommunity(communityData);
    realm.create(CommunityRO.schema.name, community, Realm.UpdateMode.All);
  });
  console.log("yess!!");
  realm.close();
  console.log("Hello buddy!");
}

// method to check for poll
function isPoll(state: number) {
  return state === 10;
}

// method to save chatroom data in realm
export async function saveChatroomResponse(
  data: any,
  chatrooms: any[],
  communityId: string
) {
  const realm = new Realm(Db.getInstance());
  console.log("Realm 1 =", Realm);
  try {
    realm.write(() => {
      const community = data.communityMeta[communityId];
      if (!community) return;

      const communityRO = convertCommunity(community);

      if (!communityRO) return;
      realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

      chatrooms.map(async (chatroom, index) => {
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

        // save lastConversation details
        const lastConversationId = chatroom.lastConversationId;
        const lastConversation =
          data.conversationMeta[lastConversationId?.toString()];

        if (!lastConversation) return;

        const lastConversationDeletedByMemberRO = !!lastConversation.deletedBy
          ? convertToMemberRO(
              data.userMeta[lastConversation.deletedBy],
              communityId
            )
          : undefined;

        // save lastConversation polls
        const lastConversationPolls = isPoll(lastConversation?.state)
          ? (data?.convPollsMeta[lastConversationId?.toString()] || []).map(
              (poll: any) => {
                let pollObject = { ...poll };
                const user = data?.userMeta[poll?.userId];
                pollObject.member = user;
                return pollObject;
              }
            )
          : null;

        // save lastConversation attachments
        const lastConversationAttachment =
          lastConversation?.attachmentCount > 0
            ? data?.convAttachmentsMeta[lastConversationId?.toString()]
            : [];

        const lastConversationCreatorId = lastConversation.userId;
        const lastConversationCreator =
          data?.userMeta[lastConversationCreatorId?.toString()];
        if (!lastConversationCreator) return;

        const lastConversationCreatorRO = convertToMemberRO(
          lastConversationCreator,
          communityId
        );

        const lastConvRO = convertToConversationRO(
          lastConversation,
          lastConversationCreatorRO,
          chatroom?.id,
          lastConversationAttachment,
          lastConversationPolls
        );

        if (!lastConversationCreatorRO) return;

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
        let lastSeenConversation =
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

          console.log(
            "singleConversation ConversationRO 2 ==",
            singleConversation
          );

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

            console.log(
              "ConversationRO 2 ==",
              lastSeenConversationRO?.chatroomId
            );

            if (lastSeenConversationRO) {
              realm.create(
                ConversationRO.schema.name,
                lastSeenConversationRO,
                Realm.UpdateMode.All
              );
            }
            console.log(
              "lastSeenConversation getSingleConversationData ===",
              lastSeenConversationRO?.lastUpdatedAt
            );
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

          const lastSeenConversationPolls = isPoll(
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

          console.log("ConversationRO ==", lastSeenConversationRO?.chatroomId);
          if (lastSeenConversationRO) {
            realm.create(
              // LastConversationRO.schema.name,
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

        // const chatroomData = await getChatroomData(chatroom?.id?.toString());
        const items = realm.objects(ChatroomRO.schema.name);
        const chatroomData = items.filtered(
          `id = "${chatroom?.id?.toString()}"`
        );
        const chatroomObject = chatroomData.map((item) => {
          const stringifiedChatroom = JSON.stringify(item);
          return {
            ...JSON.parse(stringifiedChatroom),
          };
        });

        // convert to ChatroomRO
        let chatroomRO = convertToChatroomRO(
          chatroom,
          chatroomCreatorRO,
          lastConvRO,
          lastConversationRO, //its of type LastConversationRO
          lastSeenConversationRO,
          chatroomObject[0]?.isChatroomVisited
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
      });
    });
  } finally {
    realm.close();
  }
}

// method to save conversation data
export async function saveLastConversationData(
  data: any,
  chatroomData: any[],
  conversationData: any[],
  communityId: any
) {
  console.log("Realm 2 =", Realm);
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      // save community
      const community = data.communityMeta[communityId];
      if (!community) return;

      const communityRO = convertCommunity(community);
      if (!communityRO) return;

      realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

      console.log("Realm 3 =", Realm);

      // save chatroom
      chatroomData.forEach((chatroom) => {
        const creatorId = chatroom.userId;
        const creator = data.userMeta[creatorId?.toString()];
        if (!creator) return;
        const chatroomCreatorRO = convertToMemberRO(creator, communityId);
        if (!chatroomCreatorRO) return;
        // realmWrite.insertOrUpdate(chatroomCreatorRO);
        realm.create(
          MemberRO.schema.name,
          chatroomCreatorRO,
          Realm.UpdateMode.All
        );
      });

      // save conversations
      for (const conversationId in conversationData) {
        if (conversationData.hasOwnProperty(conversationId)) {
          const conversation = conversationData[conversationId];

          // save conversation creator
          const creatorId = conversation?.userId;
          const creator = data.userMeta[creatorId?.toString()];
          if (!creator) return;
          const chatroomCreatorRO = convertToMemberRO(creator, communityId);

          if (!chatroomCreatorRO) return;
          realm.create(
            MemberRO.schema.name,
            chatroomCreatorRO,
            Realm.UpdateMode.All
          );

          // save reactions on conversations
          const conversationReaction =
            conversation?.hasReactions === true
              ? data?.convReactionsMeta[conversation?.id?.toString()]
              : [];

          // save polls
          const conversationState = conversation?.state;
          const conversationPolls = isPoll(conversationState?.state || 0)
            ? (data.convPollsMeta[conversation?.id?.toString()] || []).map(
                (poll: any) => {
                  let pollObject = { ...poll };
                  const user = data?.userMeta[poll?.userId];
                  pollObject.member = user;
                  return pollObject;
                }
              )
            : null;

          // save attachments
          const conversationAttachment =
            conversation?.attachmentCount > 0
              ? data?.convAttachmentsMeta[conversation?.id?.toString()]
              : [];

          // convert to ConversationRO
          const conversationRO = convertToConversationRO(
            conversation,
            chatroomCreatorRO,
            conversationData[conversationId]?.cardId?.toString(),
            conversationAttachment,
            conversationPolls,
            conversationReaction
          );

          // save to local DB
          if (conversationRO) {
            realm.create(
              LastConversationRO.schema.name,
              conversationRO,
              Realm.UpdateMode.All
            );
          }
        }
      }
    });
  } finally {
    realm.close();
  }
}

export async function saveConversationData(
  data: any,
  chatroomData: any[],
  conversationData: any[],
  communityId: any
) {
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    // save community
    const community = data.communityMeta[communityId];
    if (!community) return;

    const communityRO = convertCommunity(community);
    if (!communityRO) return;

    realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

    // save chatroom
    for (const chatroomID in chatroomData) {
      const chatroom = chatroomData[chatroomID];
      const creatorId = chatroom.userId;
      const creator = data.userMeta[creatorId?.toString()];
      if (!creator) return;
      const chatroomCreatorRO = convertToMemberRO(creator, communityId);

      if (!chatroomCreatorRO) return;
      realm.create(
        MemberRO.schema.name,
        chatroomCreatorRO,
        Realm.UpdateMode.All
      );
    }

    // save conversations
    conversationData.map((item, index) => {
      const conversation = item;
      // save conversation creator
      const creatorId = conversation?.userId;
      const creator = data.userMeta[creatorId?.toString()];

      if (!creator) return;
      const chatroomCreatorRO = convertToMemberRO(creator, communityId);
      if (!chatroomCreatorRO) return;
      realm.create(
        MemberRO.schema.name,
        chatroomCreatorRO,
        Realm.UpdateMode.All
      );

      // save reactions on conversations
      const conversationReaction =
        conversation.hasReactions === true
          ? data.convReactionsMeta[conversation?.id?.toString()]
          : [];

      // save polls
      const conversationState = conversation?.state;
      const conversationPolls = isPoll(conversationState?.state || 0)
        ? (data.convPollsMeta[conversation?.id?.toString()] || []).map(
            (poll: any) => {
              let pollObject = { ...poll };
              const user = data.userMeta[poll.userId];
              pollObject.member = user;
              return pollObject;
            }
          )
        : null;

      // save attachments
      const conversationAttachment =
        conversation.attachmentCount > 0
          ? data.convAttachmentsMeta[conversation?.id?.toString()]
          : [];

      // convert to ConversationRO
      const conversationRO = convertToConversationRO(
        conversation,
        chatroomCreatorRO,
        conversation?.cardId?.toString(),
        conversationAttachment,
        conversationPolls,
        conversationReaction
      );

      console.log("ConversationRO 3 ==", conversationRO?.chatroomId);
      // save to local DB
      if (conversationRO) {
        realm.create(
          ConversationRO.schema.name,
          conversationRO,
          Realm.UpdateMode.All
        );
      }
    });
  });
  realm.close();
}

// export async function saveLastSeenConversation

// this function fetches specific chatroom that are stored in local DB
export async function getChatroomData(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    console.log("Realm 4 =", Realm);
    const items = realm.objects(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    const chatroomObject = chatroom.map((chatroom) => {
      const stringifiedChatroom = JSON.stringify(chatroom);
      return {
        ...JSON.parse(stringifiedChatroom),
      };
    });
    return chatroomObject;
  } finally {
    realm.close();
  }
}

// this function fetches all chatrooms that are stored in local DB
export async function observeChatroom() {
  const realm = new Realm(Db.getInstance());
  try {
    const chatrooms = realm.objects(ChatroomRO.schema.name);

    console.log("Observer console", chatrooms);

    const chatroomObservable = new Observable((observer) => {
      const onChange = (newChatrooms: any, changes: any) => {
        const chatroomsArray = Array.from(newChatrooms);
        observer.next(chatroomsArray);
      };

      chatrooms.addListener(onChange);
      // return () => {
      //   chatrooms.removeListener(listener);
      // };
    });

    return chatroomObservable;
  } finally {
    realm.close();
  }
}

export const getAllChatroomData = async () => {
  const realm = new Realm(Db.getInstance());
  const chatrooms = realm.objects(ChatroomRO.schema.name);
  console.log("getAllChatroomData 1", chatrooms);
  const chatroomObject = chatrooms.map((chatroom) => {
    const stringifiedChatroom = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  console.log("getAllChatroomData 1", chatroomObject);
  return chatroomObject;
};

// To get community data from Realm
export async function getCommunityData() {
  const realm = new Realm(Db.getInstance());
  try {
    const communities = realm.objects(CommunityRO.schema.name);
    const communityObject = communities.map((community) => {
      const stringifiedCommunity = JSON.stringify(community);
      return {
        ...JSON.parse(stringifiedCommunity),
      };
    });

    return communityObject;
  } finally {
    realm.close();
  }
}

// To updated the timestamp in realm
export async function updateTimeStamp(
  minTimeStamp: number,
  maxTimeStamp: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const timeStampStored: any = realm.objects(TimeStampRO.schema.name)[0];
      timeStampStored.minTimeStamp = minTimeStamp;
      timeStampStored.maxTimeStamp = maxTimeStamp;
    });
  } finally {
    realm.close();
  }
}

// To get stored timestamp from Realm
export async function getTimeStamp() {
  const realm = new Realm(Db.getInstance());
  const timeStampStored = realm.objects(TimeStampRO.schema.name);

  // realm.close();
  return timeStampStored;
}

// To save timestamp in Realm
export async function saveTimeStamp(
  minTimeStamp: number,
  maxTimeStamp: number
) {
  const realm = new Realm(Db.getInstance());
  let timeStampRO = convertToTimeStampRO(minTimeStamp, maxTimeStamp);
  realm.write(() => {
    realm.create(TimeStampRO.schema.name, timeStampRO, Realm.UpdateMode.All);
  });

  realm.close();
}

// Updation of mute status in Realm
export async function updateMuteStatus(chatroomId: string, muteStats: boolean) {
  // const chatroom: any = await getOneChatroomData(chatroomId);
  // const realm = new Realm(Db.getInstance());
  // realm.write(() => {
  //   chatroom[0].muteStatus = !muteStats;
  // });
  // realm.close();
}

// Updation of unseen count in Realm
export async function updateUnseenCount(chatroomId: string) {
  const chatroom: any = await getOneChatroomData(chatroomId);
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    chatroom[0].unseenCount = 0;
  });

  realm.close();
}

// For deletion of one chatroom from Realm
export async function deleteOneChatroom(chatroomId: string) {
  const realm = new Realm(Db.getInstance());

  try {
    const items = realm.objects(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    realm.write(() => {
      realm.delete(chatroom);
    });

    return chatroom;
  } finally {
    realm.close();
  }
}

// To fetch one chatroom details from Realm
export async function getOneChatroomData(chatroomId: string) {
  const realm = new Realm(Db.getInstance());

  try {
    const items = realm.objects(ChatroomRO.schema.name);
    const chatroom = items.filtered(`id = "${chatroomId}"`);
    const chatroomObject = chatroom.map((chatroom) => {
      const stringifiedChatroom = JSON.stringify(chatroom);
      return {
        ...JSON.parse(stringifiedChatroom),
      };
    });

    return chatroomObject;
  } finally {
    realm.close();
  }
}

// To get a single conversation data from realm
export async function getSingleConversationData(conversationId: string) {
  const realm = new Realm(Db.getInstance());

  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const conversation = conversations.filtered(`id = "${conversationId}"`);
    const conversationObject = conversation.map((item) => {
      const stringifiedConversation = JSON.stringify(item);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });
    return conversationObject;
  } finally {
    realm.close();
  }
}

export async function getAllConversationData(chatroomId: string) {
  const realm = new Realm(Db.getInstance());

  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(`chatroomId = "${chatroomId}"`)
      .sorted("createdEpoch", true);
    const conversationObject = filteredConversations.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    return conversationObject;
  } finally {
    realm.close();
  }
}

export async function getConversationData(
  chatroomId: string,
  pageSize: number
) {
  const realm = new Realm(Db.getInstance());

  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(`chatroomId = "${chatroomId}"`)
      .sorted("createdEpoch", true)
      .slice(0, pageSize);
    const conversationObject = filteredConversations.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    return conversationObject;
  } finally {
    realm.close();
  }
}

export async function chatroomViewed(chatroomId: string) {
  const realm = new Realm(Db.getInstance());

  try {
    realm.write(() => {
      const chatrooms = realm.objects(ChatroomRO.schema.name);
      const filteredChatroom: any = chatrooms.filtered(
        `id = "${chatroomId}"`
      )[0];

      filteredChatroom.isChatroomVisited = true;
    });
  } finally {
    realm.close();
  }
}

export async function paginateUp(
  chatroomId: string,
  createdEpoch: number,
  pageSize: number
) {
  const realm = new Realm(Db.getInstance());

  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(
        `chatroomId = "${chatroomId}" AND createdEpoch < ${createdEpoch}`
      )
      .sorted("createdEpoch", true)
      .slice(0, pageSize);

    const conversationObject = filteredConversations.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    return conversationObject;
  } finally {
    realm.close();
  }
}
