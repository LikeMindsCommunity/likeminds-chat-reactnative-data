class SyncConversationRequest {
  // Properties of the request class
  page: number;
  pageSize: number;
  chatroomId: string;
  maxTimestamp: number;
  minTimestamp: number;
  conversationId: string | undefined;

  // Public constructor to create the request object
  constructor(
    page: number,
    pageSize: number,
    chatroomId: string,
    maxTimestamp: number,
    minTimestamp: number,
    conversationId: string | undefined
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.chatroomId = chatroomId;
    this.maxTimestamp = maxTimestamp;
    this.minTimestamp = minTimestamp;
    this.conversationId = conversationId;
  }

  // Static builder method to create the request object
  public static builder(): SyncConversationRequestBuilder {
    return new SyncConversationRequestBuilder();
  }
}

export class SyncConversationRequestBuilder {
  private page: number;
  private pageSize: number;
  private chatroomId: string;
  private maxTimestamp: number;
  private minTimestamp: number;
  private conversationId: string | undefined;

  public setPage(page: number): SyncConversationRequestBuilder {
    this.page = page;
    return this;
  }

  public setPageSize(pageSize: number): SyncConversationRequestBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public setChatroomId(chatroomId: string): SyncConversationRequestBuilder {
    this.chatroomId = chatroomId;
    return this;
  }

  public setMaxTimestamp(maxTimestamp: number): SyncConversationRequestBuilder {
    this.maxTimestamp = maxTimestamp;
    return this;
  }

  public setMinTimestamp(minTimestamp: number): SyncConversationRequestBuilder {
    this.minTimestamp = minTimestamp;
    return this;
  }

  public setConversationId(
    conversationId: string | undefined
  ): SyncConversationRequestBuilder {
    this.conversationId = conversationId;
    return this;
  }

  public build(): SyncConversationRequest {
    return new SyncConversationRequest(
      this.page,
      this.pageSize,
      this.chatroomId,
      this.maxTimestamp,
      this.minTimestamp,
      this.conversationId
    );
  }
}

export default SyncConversationRequest;
