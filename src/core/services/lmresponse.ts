class LMResponse<T> {
  public data;
  public errorMessage: string | null;
  public success: boolean;

  constructor(data, errorMessage: string | null, success: boolean) {
    this.data = data;
    this.errorMessage = errorMessage;
    this.success = success;
  }

  public getData(): T {
    return this.data;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public getStatus(): boolean {
    return this.success;
  }
}

export default LMResponse;
