import Db from "../db";
import Realm from "realm";
import { ATTACHMENT_UPLOAD_CONVERSATIONS } from "../../constants/index";

// Save a attachment upload conversation to handle all the cases of attachment upload
export async function saveAttachmentUploadConversation(
  key: string,
  value: string
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    realm.create(
      ATTACHMENT_UPLOAD_CONVERSATIONS,
      {
        key: key,
        value: value,
      },
      Realm.UpdateMode.All
    );
  });
}

// Get a all attachment upload conversations
export async function getAllAttachmentUploadConversations() {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ATTACHMENT_UPLOAD_CONVERSATIONS);
  return conversations;
}

// Get a all attachment upload conversationIDs
export async function getAllAttachmentUploadConversationIDs() {
  const realm = await Realm.open(Db.getInstance());
  const conversations: any = realm.objects(ATTACHMENT_UPLOAD_CONVERSATIONS);

  // Extract the keys (conversation IDs) from the objects
  const conversationIDs = conversations.map(
    (conversation) => conversation?.key
  );
  return conversationIDs;
}

// Remove a conversation by its key (conversation ID)
export async function removeAttactmentUploadConversationByKey(key: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversation = realm.objectForPrimaryKey(
    ATTACHMENT_UPLOAD_CONVERSATIONS,
    key
  );

  if (conversation) {
    realm.write(() => {
      realm.delete(conversation);
    });
  }
}
