import { ConversationRO } from "../../models/ConversationRO";
import { convertToMemberRO } from "../ROConverter";
import Realm from "realm";
import { getChatroom } from "./chatroom";
import { Conversation } from "src/shared/responseModels/Conversation";
import { ChatroomRO } from "src/localDb/models/ChatroomRO";

// Updation of mute status in Realm
export async function updateMuteStatus(
  realm: Realm,
  chatroomId: string,
  muteStatus: boolean
) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  console.log("muteStatusChatroom", muteStatus);
  console.log("chatroomMuteSraaer", chatroom);

  realm.write(() => {
    chatroom.muteStatus = !muteStatus;
  });
}

// Updation of unseen count in Realm
export async function updateUnseenCount(realm: Realm, chatroomId: string) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  realm.write(() => {
    chatroom.unseenCount = 0;
  });
}

export async function updateChatroomFollowStatus(
  realm: Realm,
  chatroomId: string
) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  console.log("chatroomFollowStatus", chatroom?.followStatus);

  realm.write(() => {
    chatroom.followStatus = true;
  });

  const chatroomNew: ChatroomRO = await getChatroom(realm, chatroomId);
  console.log("chatroomFollowStatusNew", chatroomNew?.followStatus);
}

// Updation of followStatus of a chatroom in Realm
export async function setFollowStatus(realm: Realm, chatroomId: string) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  realm.write(() => {
    chatroom.followStatus = false;
  });
}

export async function updateChatRequestState(
  realm: Realm,
  chatroomId: string,
  chatRequestState: number
) {
  const chatroom: ChatroomRO = await getChatroom(realm, chatroomId);
  realm.write(() => {
    chatroom.chatRequestState = chatRequestState;
  });
}

// To update deletedBy and deletedByMember of a conversation in realm
export async function updateDeletedBy(
  realm: Realm,
  conversationId: string,
  data: Conversation
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
