import { ATTACHMENT_UPLOAD_CONVERSATIONS, STRING } from "../constants";

export class AttachmentUploadConversationsRO extends Realm.Object<AttachmentUploadConversationsRO> {
  key!: string;
  value!: string;

  static schema: Realm.ObjectSchema = {
    name: ATTACHMENT_UPLOAD_CONVERSATIONS,
    properties: {
      key: STRING, // Unique identifier for the conversation (the conversation ID)
      value: STRING, // Serialized conversation data (e.g., as JSON)
    },
    primaryKey: "key",
  };
}
