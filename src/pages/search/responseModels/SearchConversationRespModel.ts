interface Conversation {
  // Define properties of the conversation if available
}

interface Data {
  conversations: Conversation[];
}

export interface SearchConversationResponse {
  success: boolean;
  data: Data;
}
