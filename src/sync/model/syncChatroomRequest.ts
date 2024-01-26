class SyncChatroomRequest {
  // Properties of the request class
  page: number;
  pageSize: number;
  chatroomTypes: number[];
  maxTimestamp: number;
  minTimestamp: number;
  chatroomId?: number;

  // Public constructor to create the request object
  constructor(
    page: number,
    pageSize: number,
    chatroomTypes: number[],
    maxTimestamp: number,
    minTimestamp: number,
    chatroomId?: number
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.chatroomTypes = chatroomTypes;
    this.maxTimestamp = maxTimestamp;
    this.minTimestamp = minTimestamp;
    this.chatroomId = chatroomId;
  }

  // Static builder method to create the request object
  public static builder(): SyncChatroomRequestBuilder {
    return new SyncChatroomRequestBuilder();
  }
}

export class SyncChatroomRequestBuilder {
  private page: number;
  private pageSize: number;
  private chatroomTypes: number[];
  private maxTimestamp: number;
  private minTimestamp: number;
  private chatroomId?: number;

  public setPage(page: number): SyncChatroomRequestBuilder {
    this.page = page;
    return this;
  }

  public setPageSize(pageSize: number): SyncChatroomRequestBuilder {
    this.pageSize = pageSize;
    return this;
  }

  public setChatroomTypes(chatroomTypes: number[]): SyncChatroomRequestBuilder {
    this.chatroomTypes = chatroomTypes;
    return this;
  }

  public setMaxTimestamp(maxTimestamp: number): SyncChatroomRequestBuilder {
    this.maxTimestamp = maxTimestamp;
    return this;
  }

  public setMinTimestamp(minTimestamp: number): SyncChatroomRequestBuilder {
    this.minTimestamp = minTimestamp;
    return this;
  }

  public setChatroomId(chatroomId: number): SyncChatroomRequestBuilder {
    this.chatroomId = chatroomId;
    return this;
  }

  public build(): SyncChatroomRequest {
    return new SyncChatroomRequest(
      this.page,
      this.pageSize,
      this.chatroomTypes,
      this.maxTimestamp,
      this.minTimestamp,
      this.chatroomId
    );
  }
}

export default SyncChatroomRequest;
