class SyncConversationRequest {
  // Properties of the request class
  page: number;
  pageSize: number;
  chatroomId: string;
  maxTimestamp: number;
  minTimestamp: number;

  // Public constructor to create the request object
  constructor(
    page: number,
    pageSize: number,
    chatroomId: string,
    maxTimestamp: number,
    minTimestamp: number
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.chatroomId = chatroomId;
    this.maxTimestamp = maxTimestamp;
    this.minTimestamp = minTimestamp;
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

  public build(): SyncConversationRequest {
    return new SyncConversationRequest(
      this.page,
      this.pageSize,
      this.chatroomId,
      this.maxTimestamp,
      this.minTimestamp
    );
  }
}

export default SyncConversationRequest;
