import { ConversationRO } from "../../Models/ConversationRO";
import { convertToMemberRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { getOneChatroomData } from "./chatroom";

// Updation of mute status in Realm
export async function updateMuteStatus(chatroomId: string, muteStats: boolean) {
  const chatroom: any = await getOneChatroomData(chatroomId);
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    chatroom[0].muteStatus = !muteStats;
  });
}

// Updation of unseen count in Realm
export async function updateUnseenCount(chatroomId: string) {
  const chatroom: any = await getOneChatroomData(chatroomId);
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    chatroom[0].unseenCount = 0;
  });
}

export async function updateDeletedBy(conversationId: string, data: any) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    const conversations = realm.objects(ConversationRO.schema.name);
    const conversationObj: any = conversations.filtered(
      `id = "${conversationId}"`
    );
    conversationObj[0].deletedBy = data.deletedBy.toString();
    const memberRo = convertToMemberRO(data.deletedByMember, data.communityId);
    conversationObj[0].deletedByMember = memberRo;
  });
}
