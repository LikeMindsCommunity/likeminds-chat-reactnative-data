class SyncConversationRequest {
  // Properties of the request class
  page: number;
  pageSize: number;
  chatroomTypes: number[];
  maxTimestamp: number;
  minTimestamp: number;
  isLocalDb: boolean;

  // Public constructor to create the request object
  constructor(
    page: number,
    pageSize: number,
    chatroomTypes: number[],
    maxTimestamp: number,
    minTimestamp: number,
    isLocalDb: boolean
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.chatroomTypes = chatroomTypes;
    this.maxTimestamp = maxTimestamp;
    this.minTimestamp = minTimestamp;
    this.isLocalDb = isLocalDb;
  }

  // Static builder method to create the request object
  public static builder(): SyncConversationRequestBuilder {
    return new SyncConversationRequestBuilder();
  }
}

export class SyncConversationRequestBuilder {
  private page: number;
  private pageSize: number;
  private chatroomTypes: number[];
  private maxTimestamp: number;
  private minTimestamp: number;
  private isLocalDb: boolean;

  public setPage(page: number): SyncConversationRequestBuilder {
    this.page = page;
    return this;
  }

  public setPageSize(pageSize: number): SyncConversationRequestBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public setChatroomTypes(
    chatroomTypes: number[]
  ): SyncConversationRequestBuilder {
    this.chatroomTypes = chatroomTypes;
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

  public setIsLocalDb(isLocalDb: boolean): SyncConversationRequestBuilder {
    this.isLocalDb = isLocalDb;
    return this;
  }

  public build(): SyncConversationRequest {
    return new SyncConversationRequest(
      this.page,
      this.pageSize,
      this.chatroomTypes,
      this.maxTimestamp,
      this.minTimestamp,
      this.isLocalDb
    );
  }
}

export default SyncConversationRequest;
