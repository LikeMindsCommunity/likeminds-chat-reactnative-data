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
import { Member } from "src/shared/responseModels/Member";

// method to save chatroom data in realm
export async function saveChatroomResponse(
  realm: Realm,
  data: SyncChatroomResponse,
  chatrooms: Chatroom[],
  communityId: string
) {
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
        const chatroomWithUser = data.userMeta[chatroomWithUserId?.toString()];
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
          ? (data?.convPollsMeta[lastSeenConversationId?.toString()] || []).map(
              (poll: any) => {
                let pollObject = { ...poll };
                const user = data?.userMeta[poll.userId];
                pollObject.member = user;
                return pollObject;
              }
            )
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
        lastConversationRO,
        lastSeenConversationRO
      );

      // save to local DB
      if (chatroomRO) {
        chatroomRO.relationshipNeeded = true;
        realm.create(ChatroomRO.schema.name, chatroomRO, Realm.UpdateMode.All);
      }
    });
  });
}

export async function editChatroomDetails(
  realm: Realm,
  chatroomWithUser: Member,
  chatroomId: string,
  communityId: string
) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  const chatroomWithUserRO = convertToMemberRO(chatroomWithUser, communityId);
  realm.write(() => {
    chatroom.chatroomWithUser = chatroomWithUserRO;
  });
}

export async function saveDMChatroom(
  realm: Realm,
  chatroom: Chatroom,
  communityId: string,
  user: Member
) {
  realm.write(() => {
    const member = chatroom?.member;
    const memberRO = convertToMemberRO(member, communityId);
    const chatroomWithUser = chatroom?.chatroomWithUser;
    const chatroomWithUserRO = convertToMemberRO(chatroomWithUser, communityId);
    const chatRequestedByRO = convertToMemberRO(user, communityId);
    const chatroomRO = convertToChatroomRO(
      realm,
      chatroom,
      memberRO,
      chatroomWithUserRO,
      chatRequestedByRO
    );
    if (chatroomRO) {
      realm.create(ChatroomRO.schema.name, chatroomRO, Realm.UpdateMode.All);
    }
  });
}

// To get chatroom filtered based on DMFeed or GroupFeed
export async function getFilteredChatrooms(realm: Realm, isDm: boolean) {
  const items = realm.objects(ChatroomRO.schema.name);
  const filteredAndSortedChatroom = isDm
    ? items
        .filtered(`(type = 10) && (followStatus=true)`)
        .sorted("updatedAt", true)
    : items
        .filtered(`(type = 0 || type=7) && (followStatus=true)`)
        .sorted("updatedAt", true);
  const stringifiedChatroom = JSON.parse(
    JSON.stringify(filteredAndSortedChatroom)
  );
  return stringifiedChatroom;
}

// To get chatroom data from Realm
export async function getChatrooms(realm: Realm) {
  const chatrooms = realm.objects(ChatroomRO.schema.name);
  const listOfChatroomObject = chatrooms.map((chatroom) => {
    const stringifiedChatroom = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  return listOfChatroomObject;
}

// To fetch one chatroom details from Realm
export async function getChatroom(realm: Realm, chatroomId: string) {
  const items = realm.objects<ChatroomRO>(ChatroomRO.schema.name);
  const chatroom = items.filtered(`id = "${chatroomId}"`);
  return chatroom[0];
}

// For deletion of one chatroom from Realm
export async function deleteChatroom(realm: Realm, chatroomId: string) {
  const items = realm.objects(ChatroomRO.schema.name);
  const chatroom = items.filtered(`id = "${chatroomId}"`);
  realm.write(() => {
    realm.delete(chatroom);
  });
}

export async function chatroomViewed(realm: Realm, chatroomId: string) {
  realm.write(() => {
    const chatrooms = realm.objects(ChatroomRO.schema.name);
    const filteredChatroom: any = chatrooms.filtered(`id = "${chatroomId}"`)[0];
    filteredChatroom.isChatroomVisited = true;
  });
}
