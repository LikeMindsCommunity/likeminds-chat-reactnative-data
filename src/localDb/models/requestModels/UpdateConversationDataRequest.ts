import { Conversation } from "../../../shared/responseModels/Conversation";
export default class UpdateConversationDataRequest {
    conversation: Conversation;
    widgets?: Record<string, any>;

    constructor(conversation: Conversation, widgets?: Record<string, any>) {
        this.conversation = conversation;
        this.widgets = widgets;
    }

    public static builder(): UpdateConversationDataRequestBuilder {
        return new UpdateConversationDataRequestBuilder();
    }
}

class UpdateConversationDataRequestBuilder {
    private conversation: Conversation;
    private widgets: Record<string, any>;

    public setConversation(conversation: Conversation): UpdateConversationDataRequestBuilder {
        this.conversation = conversation;
        return this;
    }

    public setWidgets(widgets: Record<string, any>): UpdateConversationDataRequestBuilder {
        this.widgets = widgets;
        return this;
    }

    public build(): UpdateConversationDataRequest {
        if (!this.conversation) {
            throw new Error("conversation is required.");
        }
        return new UpdateConversationDataRequest(this.conversation, this.widgets);
    }
}
