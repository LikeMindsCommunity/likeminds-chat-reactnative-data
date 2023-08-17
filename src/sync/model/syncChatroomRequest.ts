class SyncChatroomRequest {
  // Properties of the request class
  page: number;
  page_size: number;
  chatroom_types: number[];
  max_timestamp: number;
  min_timestamp: number;

  // Public constructor to create the request object
  constructor(
    page: number,
    page_size: number,
    chatroom_types: number[],
    max_timestamp: number,
    min_timestamp: number
  ) {
    this.page = page;
    this.page_size = page_size;
    this.chatroom_types = chatroom_types;
    this.max_timestamp = max_timestamp;
    this.min_timestamp = min_timestamp;
  }

  // Static builder method to create the request object
  public static builder(): SyncChatroomRequestBuilder {
    return new SyncChatroomRequestBuilder();
  }
}

export class SyncChatroomRequestBuilder {
  private page: number;
  private page_size: number;
  private chatroom_types: number[];
  private max_timestamp: number;
  private min_timestamp: number;

  public setPage(page: number): SyncChatroomRequestBuilder {
    this.page = page;
    return this;
  }

  public setPageSize(pageSize: number): SyncChatroomRequestBuilder {
    this.page_size = pageSize;
    return this;
  }

  public setChatroomTypes(chatroomTypes: number[]): SyncChatroomRequestBuilder {
    this.chatroom_types = chatroomTypes;
    return this;
  }

  public setMaxTimestamp(maxTimestamp: number): SyncChatroomRequestBuilder {
    this.max_timestamp = maxTimestamp;
    return this;
  }

  public setMinTimestamp(minTimestamp: number): SyncChatroomRequestBuilder {
    this.min_timestamp = minTimestamp;
    return this;
  }

  public build(): SyncChatroomRequest {
    return new SyncChatroomRequest(
      this.page,
      this.page_size,
      this.chatroom_types,
      this.max_timestamp,
      this.min_timestamp
    );
  }
}

export default SyncChatroomRequest;
