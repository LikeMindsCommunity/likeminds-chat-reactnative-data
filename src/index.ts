import DLClient from "@likeminds.community/chat-js-beta";

class LMChatClient {
  private static apiKey: string | null = null;
  private static platformCode: string | null = null;
  private static versionCode: number | null = null;

  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    return this;
  }

  static setPlatformCode(platformCode: string) {
    this.platformCode = platformCode;
    return this;
  }

  static setVersionCode(versionCode: number) {
    this.versionCode = versionCode;
    return this;
  }

  public static build(): DLClient {
    // Perform any necessary validation or configuration checks
    if (!this.apiKey || !this.platformCode || !this.versionCode) {
      throw new Error(
        "Please provide apiKey, platformCode, and versionCode before building the LMChatClient."
      );
    }

    const myClient = new DLClient({
      xApiKey: this.apiKey!,
      xPlatformCode: this.platformCode!,
      xVersionCode: this.versionCode!,
      xSdkSource: "native",
    });

    return myClient;
  }
}

export { LMChatClient as default };
