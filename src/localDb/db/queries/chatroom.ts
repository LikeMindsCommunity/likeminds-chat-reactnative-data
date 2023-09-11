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

// method to check for poll
function isPoll(state: number) {
  return state == 10;
}

// method to save chatroom data in realm
export async function saveChatroomResponse(
  data: SyncChatroomResponse,
  chatrooms: Chatroom[],
  communityId: string
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
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
      const lastConversationPolls = isPoll(lastConversation.state)
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

      const conversationRO = convertToConversationRO(
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

      // convert to ChatroomRO
      const chatroomRO = convertToChatroomRO(
        chatroom,
        chatroomCreatorRO,
        conversationRO,
        lastConversationRO //its of type LastConversationRO
      );

      // save to local DB
      if (chatroomRO) {
        chatroomRO.relationshipNeeded = true;
        realm.create(ChatroomRO.schema.name, chatroomRO, Realm.UpdateMode.All);
      }
    });
  });
}

// To get chatroom data from Realm
export async function getChatroomData() {
  const realm = await Realm.open(Db.getInstance());
  const chatrooms = realm.objects(ChatroomRO.schema.name);
  const chatroomObject = chatrooms.map((chatroom) => {
    const stringifiedChatroom = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  return chatroomObject;
}

// To fetch one chatroom details from Realm
export async function getOneChatroomData(chatroomId: string) {
  const realm = await Realm.open(Db.getInstance());
  const items = realm.objects(ChatroomRO.schema.name);
  const chatroom = items.filtered(`id = "${chatroomId}"`);
  const chatroomObject = chatroom.map((chatroom) => {
    const stringifiedChatroom = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  return chatroom;
}

// For deletion of one chatroom from Realm
export async function deleteOneChatroom(chatroomId: string) {
  const realm = await Realm.open(Db.getInstance());
  const items = realm.objects(ChatroomRO.schema.name);
  const chatroom = items.filtered(`id = "${chatroomId}"`);
  realm.write(() => {
    realm.delete(chatroom);
  });
}
