import Db from "../db";
import Realm from "realm";
import { ATTACHMENT_UPLOAD_CONVERSATIONS } from "../../constants/index";

// Save a attachment upload conversation to handle all the cases of attachment upload
export async function saveAttachmentUploadConversation(
  key: string,
  value: string,
  realm: Realm
) {
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
export async function getAllAttachmentUploadConversations(realm: Realm) {
  const conversations = realm.objects(ATTACHMENT_UPLOAD_CONVERSATIONS);
  const stringifiedConversation = JSON.parse(JSON.stringify(conversations));
  return stringifiedConversation;
}

// Remove a conversation by its key (conversation ID)
export async function removeAttactmentUploadConversationByKey(
  key: string,
  realm: Realm
) {
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
