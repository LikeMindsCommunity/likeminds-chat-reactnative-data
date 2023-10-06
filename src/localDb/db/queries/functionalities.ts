import { ConversationRO } from "../../models/ConversationRO";
import { convertToMemberRO } from "../ROConverter";
import Realm from "realm";
import { getChatroom } from "./chatroom";
import { Conversation } from "src/shared/responseModels/Conversation";
import { ChatroomRO } from "src/localDb/models/ChatroomRO";
import Db from "../db";

// Updation of mute status in Realm
export async function updateMuteStatus(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom: ChatroomRO = await getChatroom(chatroomId);
    realm.write(() => {
      chatroom.muteStatus = !chatroom?.muteStatus;
    });
  } finally {
    realm.close();
  }
}

// Updation of unseen count in Realm
export async function updateUnseenCount(chatroomId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom: ChatroomRO = await getChatroom(chatroomId);
    realm.write(() => {
      chatroom.unseenCount = 0;
    });
  } finally {
    realm.close();
  }
}

export async function updateChatroomFollowStatus(
  chatroomId: string,
  followStatus: boolean
) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom: ChatroomRO = await getChatroom(chatroomId);
    realm.write(() => {
      chatroom.followStatus = followStatus;
    });
  } finally {
    realm.close();
  }
}

export async function updateChatRequestState(
  chatroomId: string,
  chatRequestState: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    const chatroom: ChatroomRO = await getChatroom(chatroomId);
    realm.write(() => {
      chatroom.chatRequestState = chatRequestState;
    });
  } finally {
    realm.close();
  }
}

// To update deletedBy and deletedByMember of a conversation in realm
export async function updateDeletedBy(
  conversationId: string,
  data: Conversation
) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const conversations = realm.objects(ConversationRO.schema.name);
      const conversationObj: any = conversations.filtered(
        `id = "${conversationId}"`
      );
      conversationObj[0].deletedBy = data.deletedBy.toString();
      const memberRO = convertToMemberRO(
        data.deletedByMember,
        data.communityId
      );
      conversationObj[0].deletedByMember = memberRO;
    });
  } finally {
    realm.close();
  }
}
