import { Attachment } from "../../../shared/responseModels/Attachment";

export interface UpdateAttachmentRequest {
    ConversationID: string;
    attachment: Attachment;
}