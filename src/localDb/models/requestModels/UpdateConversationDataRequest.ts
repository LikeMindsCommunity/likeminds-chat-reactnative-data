import { Widget } from "../../../shared/responseModels/Widget";
import { Conversation } from "../../../shared/responseModels/Conversation";
export default class UpdateConversationDataRequest {
    conversation: Conversation;
    widgets?: Widget

    constructor(conversation: Conversation, widgets?: Widget) {
        this.conversation = conversation;
        this.widgets = widgets;
    }

    public static builder(): UpdateConversationDataRequestBuilder {
        return new UpdateConversationDataRequestBuilder();
    }
}

class UpdateConversationDataRequestBuilder {
    private conversation: Conversation;
    private widgets: Widget

    public setConversation(conversation: Conversation): UpdateConversationDataRequestBuilder {
        this.conversation = conversation;
        return this;
    }

    public setWidgets(widgets: Widget): UpdateConversationDataRequestBuilder {
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
