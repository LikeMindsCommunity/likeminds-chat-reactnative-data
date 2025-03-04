import { Attachment } from "../../../shared/responseModels/Attachment";

export default class UpdateAttachmentRequest {
    conversationID: string;
    attachment: Attachment;

    constructor(conversationID: string, attachment: Attachment) {
        this.conversationID = conversationID;
        this.attachment = attachment;
    }

    public static builder(): UpdateAttachmentRequestBuilder {
        return new UpdateAttachmentRequestBuilder();
    }
}

class UpdateAttachmentRequestBuilder {
    private conversationID: string | undefined;
    private attachment: Attachment | undefined;

    public setConversationID(conversationID: string): UpdateAttachmentRequestBuilder {
        this.conversationID = conversationID;
        return this;
    }

    public setAttachment(attachment: Attachment): UpdateAttachmentRequestBuilder {
        this.attachment = attachment;
        return this;
    }

    public build(): UpdateAttachmentRequest {
        if (!this.conversationID || !this.attachment) {
            throw new Error("conversationID and attachment are required.");
        }
        return new UpdateAttachmentRequest(this.conversationID, this.attachment);
    }
}