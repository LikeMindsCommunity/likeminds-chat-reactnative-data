import { Attachment } from "../../../shared/responseModels/Attachment";
import { UpdateAttachmentRequest } from "./UpdateAttachmentRequest"

class UpdateAttachmentRequestBuilder {
  private ConversationID: string;
  private attachment: Attachment;

  private constructor() {
    // Private constructor to enforce the usage of the static method
  }

  static builder(): UpdateAttachmentRequestBuilder {
    return new UpdateAttachmentRequestBuilder();
  }

  setConversationID(ConversationID: string): UpdateAttachmentRequestBuilder {
    this.ConversationID = ConversationID;
    return this;
  }

  setAttachment(attachment: Attachment): UpdateAttachmentRequestBuilder {
    this.attachment = attachment;
    return this;
  }


  build(): UpdateAttachmentRequest {
    if (!this.ConversationID || !this.attachment) {
      throw new Error("ConversationID and attachment are required");
    }

    return {
        ConversationID: this.ConversationID,
        attachment: this.attachment
    };
  }
}

export default UpdateAttachmentRequestBuilder;