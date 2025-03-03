import { Conversation } from "../../../shared/responseModels/Conversation";

export interface UpdateConversationDataRequest {
    conversation: Conversation;
    widgets: Record<string, any>;
}