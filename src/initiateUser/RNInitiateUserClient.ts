import { LMSDKCallbacks } from "@likeminds.community/chat-js";
import {
  InitUserWithUuid,
  ValidateUser,
} from "@likeminds.community/chat-js/dist/pages/user/types";
import NetworkLibrary from "@likeminds.community/chat-js/dist/core/services/networklibrary";
import RNNetworkLibrary from "../core/services/networkLibrary";
import { ModelConverter } from "../utils/ModelConverter";
import DLClient from "@likeminds.community/chat-js";
import { InitiateUserResponse } from "../pages/user/responseModels/InitUserResponse";
import { ValidateUserResponse } from "../pages/user/responseModels/ValidateUserResponse";
import { API } from "src/shared/constants/api.constant";

class RNInitiateUserClient {
  private rnNetworkLibrary: RNNetworkLibrary;
  private networkLibrary: NetworkLibrary;

  constructor(
    networkInstance: NetworkLibrary,
    dlClient: DLClient,
    versionCode: number,
    platformCode: string,
    lmSdkCallbacks: LMSDKCallbacks
  ) {
    this.networkLibrary = networkInstance;
    this.rnNetworkLibrary = new RNNetworkLibrary(
      dlClient,
      versionCode,
      platformCode,
      lmSdkCallbacks
    );
  }

  public async validateUser(
    request: ValidateUser
  ): Promise<ValidateUserResponse> {
    this.networkLibrary.setAccessToken(request.accessToken);
    this.networkLibrary.setRefreshToken(request.refreshToken);

    /* @ts-ignore */
    return this.rnNetworkLibrary
      .makeAuthenticatedRequest(`${API.SDK_INITIATE}`)
      .then((resData: any) => {
        // Handle the response and return the LMResponse object
        const responseData: ValidateUserResponse =
          ModelConverter.responseBodyParser(resData);

        return responseData;
      })
      .catch((error) => {
        return {
          success: false,
          errorMessage: error,
        };
      });
  }

  public async initiateUser(
    request: InitUserWithUuid
  ): Promise<InitiateUserResponse> {
    this.rnNetworkLibrary.setApiKeyInLocalStorage(request?.apiKey);
    this.rnNetworkLibrary.setUserInLocalStorage(
      JSON.stringify({
        apiKey: request?.apiKey,
        userName: request?.userName,
        userUniqueId: request?.uuid,
      })
    );
    const params = ModelConverter.requestBodyGenerator(request);

    /* @ts-ignore */
    return this.rnNetworkLibrary
      .makeAuthenticatedRequest(`${API.SDK_INITIATE}`, {
        method: "POST",
        data: params,
      })
      .then((resData: any) => {
        const accessToken = resData?.data?.access_token;
        this.networkLibrary.setAccessToken(accessToken);
        const refreshToken = resData?.data?.refresh_token;
        this.networkLibrary.setRefreshToken(refreshToken);
        this.rnNetworkLibrary.setTokens(accessToken, refreshToken);
        // Handle the response and return the LMResponse object
        const responseData: InitiateUserResponse =
          ModelConverter.responseBodyParser(resData);
        return responseData;
      })
      .catch((error) => {
        return {
          success: false,
          errorMessage: error,
        };
      });
  }
}

export default RNInitiateUserClient;
