import { ConversationRO } from "../../models/ConversationRO";
import { convertToMemberRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { getChatroom } from "./chatroom";
import { Conversation } from "src/shared/responseModels/Conversation";

// Updation of mute status in Realm
export async function updateMuteStatus(
  chatroomId: string,
  muteStatus: boolean,
  realm: Realm
) {
  const chatroom: any = await getChatroom(chatroomId, realm);
  realm.write(() => {
    chatroom[0].muteStatus = !muteStatus;
  });
}

// Updation of unseen count in Realm
export async function updateUnseenCount(chatroomId: string, realm: Realm) {
  const chatroom: any = await getChatroom(chatroomId, realm);
  realm.write(() => {
    chatroom[0].unseenCount = 0;
  });
}

// To update deletedBy and deletedByMember of a conversation in realm
export async function updateDeletedBy(
  conversationId: string,
  data: Conversation,
  realm: Realm
) {
  realm.write(() => {
    const conversations = realm.objects(ConversationRO.schema.name);
    const conversationObj: any = conversations.filtered(
      `id = "${conversationId}"`
    );
    conversationObj[0].deletedBy = data.deletedBy.toString();
    const memberRO = convertToMemberRO(data.deletedByMember, data.communityId);
    conversationObj[0].deletedByMember = memberRO;
  });
}
