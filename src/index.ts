import DLClient from "@likeminds.community/chat-js";
import { ModelConverter } from "./utils/ModelConverter";
//Chatroom
import ChatroomClass from "./pages/chatroom/chatroomClass";
import {
  FollowChatroom,
  MuteChatroom,
  Chatroom,
  MarkRead,
  ShareChatroom,
  SetChatroom,
  TaggingList,
  Conversation,
  PostConversation,
  EditConversation,
  DeleteConversation,
  PutReaction,
  DeleteReaction,
  PutMultimedia,
  DecodeUrl,
  GetReportTags,
  PushReport,
  LeaveSecretChatroom,
  Profile,
  ParticipantsType,
  CmetaType,
  CHTYPE,
  CRSeen,
  ChatroomSeen,
} from "./pages/chatroom/requestModels/requestModels";
import { MuteChatroomResponse } from "./pages/chatroom/responseModels/MuteChatroomRespModel";
import LMResponse from "../src/core/services/lmresponse";
import { FollowChatroomResponse } from "./pages/chatroom/responseModels/FollowChatroomRespModel";
import { ChatroomRespModel } from "./pages/chatroom/responseModels/ChatroomRespModel";
import { ShareDataResponse } from "./pages/chatroom/responseModels/ShareChatroomRespModel";
import { MarkReadChatroomResponse } from "./pages/chatroom/responseModels/MarkReadChatroomRespModel";
import { SetChatroomTopicResponse } from "./pages/chatroom/responseModels/SetChatroomTopicRespModel";
import { TaggingListResponse } from "./pages/chatroom/responseModels/TaggingListRespModel";
import { GetConversationResponse } from "./pages/chatroom/responseModels/GetConversationRespModel";
import { PutReactionResponse } from "./pages/chatroom/responseModels/PutReactionRespModel";
import { PutMultimediaResponse } from "./pages/chatroom/responseModels/PutMultimediaRespModel";
import { DecodeUrlResponse } from "./pages/chatroom/responseModels/DecodeUrlRespModel";
import { ReportTagResponse } from "./pages/chatroom/responseModels/ReportTagRespModel";
import { PushReportResponse } from "./pages/chatroom/responseModels/PushReportRespModel";
import { ChatroomParticipantsResponse } from "./pages/chatroom/responseModels/ChatroomParticipantsRespModel";
import { ProfileDataResponse } from "./pages/chatroom/responseModels/ProfileDataRespModel";
import { CRSeenResponse } from "./pages/chatroom/responseModels/CRSeenRespModel";

//DM
import {
  FetchDMFeed,
  CheckDMStatus,
  CheckDMLimit,
  CreateDMChatroom,
  SendDMRequest,
  BlockMember,
  CID,
  CANDM,
} from "./pages/directMessage/requestModels/requestModel";
import { DMStatusResponse } from "./pages/directMessage/responseModels/DMStatusRespModel";
import { DMLimitResponse } from "./pages/directMessage/responseModels/DMLimitRespModel";
import { SendDMRequestResponse } from "./pages/directMessage/responseModels/SendDMRequestRespModel";
import { CheckDMTabResponse } from "./pages/directMessage/responseModels/CheckDMTabRespModel";

//Explore Feed
import { ExploreFeedData } from "./pages/exploreFeed/requestModels/requestModel";
import { ExploreFeedResponse } from "./pages/exploreFeed/responseModels/ExploreFeedRespModel";
import { AddPollResponse } from "./pages/poll/responseModels/AddPollRespModel";

//HomeFeed
import {
  HomeFeed,
  CRid,
  INVITE,
  IaType,
  Device,
  Participant,
} from "./pages/homeFeed/requestModels/requestModel";
import { HomeFeedResponse } from "./pages/homeFeed/responseModels/HomeFeedRespModel";
import { SendInviteResponse } from "./pages/homeFeed/responseModels/SendInviteRespModel";
import { InviteActionResponse } from "./pages/homeFeed/responseModels/InviteActionRespModel";

//POLL
import {
  PostPollConversationRequest,
  GetPollUsersRequest,
  AddPollOptionRequest,
  SubmitPollRequest,
} from "./pages/poll/requestModels/requestModel";
import { PostPollConversationResponse } from "./pages/poll/responseModels/PostPollConversationRespModel";
import { GetPollUsersResponse } from "./pages/poll/responseModels/GetPollUserRespModel";
import { SubmitPollResponse } from "./pages/poll/responseModels/SubmitPollRespModel";

//Search
import {
  SearchType,
  SearchConversation,
} from "./pages/search/requestModels/requestModel";
import { SearchChatroomResponse } from "./pages/search/responseModels/SearchChatroomRespModel";
import { SearchConversationResponse } from "./pages/search/responseModels/SearchConversationRespModel";

//User
import {
  InitUser,
  GetProfile,
  GetMemberChatroom,
  EditProfile,
  GetAllMembers,
  Logout,
  MemberState,
  USERTYPE,
  PROFILE,
  Members,
  Search,
} from "./pages/user/requestModels/requestModel";
import { InitUserResponse } from "./pages/user/responseModels/InitUserRespModel";
import { LogoutUserResponse } from "./pages/user/responseModels/LogoutUserRespModel";
import { GetProfileResponse } from "./pages/user/responseModels/GetProfileRespModel";
import { GetMemberResponse } from "./pages/user/responseModels/GetMemberChatroomRespModel";
import { GetQuestionsResponse } from "./pages/user/responseModels/GetQuestionsRespModel";
import { GetMemberStateResponse } from "./pages/user/responseModels/GetMemberStateRespModel";
import { EditProfileResponse } from "./pages/user/responseModels/EditProfileRespModel";
import { SearchMembersResponse } from "./pages/user/responseModels/SearchMembersRespModel";
import { GetAllMembersResponse } from "./pages/user/responseModels/GetAllMemberRespModel";

class LMChatClient {
  private static apiKey: string | null = null;
  private static platformCode: string | null = null;
  private static versionCode: number | null = null;
  private static dlClient: DLClient;
  private static chatroomClient: ChatroomClass;

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

  public static build(): LMChatClient {
    // Perform any necessary validation or configuration checks
    if (!this.apiKey || !this.platformCode || !this.versionCode) {
      throw new Error(
        "Please provide apiKey, platformCode, and versionCode before building the LMChatClient."
      );
    }

    this.dlClient = new DLClient({
      xApiKey: this.apiKey!,
      xPlatformCode: this.platformCode!,
      xVersionCode: this.versionCode!,
      xSdkSource: "chat",
    });

    //Q: is this the right way to create lmChatClient obj
    const lmChatClient = new LMChatClient();

    return lmChatClient;
  }

  chatroomClient = new ChatroomClass();

  async muteChatroom(
    muteChatroom: MuteChatroom
  ): Promise<LMResponse<MuteChatroomResponse>> {
    return this.chatroomClient.muteChatroom(muteChatroom);
  }

  async followChatroom(
    followChatroom: FollowChatroom
  ): Promise<LMResponse<FollowChatroomResponse>> {
    return this.chatroomClient.followChatroom(followChatroom);
  }

  async getChatroom(
    chatroom: Chatroom
  ): Promise<LMResponse<ChatroomRespModel>> {
    try {
      const params = ModelConverter.requestBodyGenerator(chatroom);
      const resp = await LMChatClient.dlClient.getChatroom(params);
      const convertedResp: ChatroomRespModel =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ChatroomRespModel>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ChatroomRespModel>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async markReadChatroom(
    markRead: MarkRead
  ): Promise<LMResponse<MarkReadChatroomResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(markRead);
      const resp = await LMChatClient.dlClient.markReadChatroom(params);
      const convertedResp: MarkReadChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<MarkReadChatroomResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<MarkReadChatroomResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async shareChatroomUrl(
    shareChatroom: ShareChatroom
  ): Promise<LMResponse<ShareDataResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(shareChatroom);
      const resp = await LMChatClient.dlClient.shareChatroomUrl(params);
      const convertedResp: ShareDataResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ShareDataResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ShareDataResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async setChatroomTopic(
    setChatroom: SetChatroom
  ): Promise<LMResponse<SetChatroomTopicResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(setChatroom);
      const resp = await LMChatClient.dlClient.setChatroomTopic(params);
      const convertedResp: SetChatroomTopicResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SetChatroomTopicResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<SetChatroomTopicResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //acc to postman resp from here on
  async getTaggingList(
    taggingList: TaggingList
  ): Promise<LMResponse<TaggingListResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(taggingList);
      const resp = await LMChatClient.dlClient.setChatroomTopic(params);
      const convertedResp: TaggingListResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<TaggingListResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<TaggingListResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getConversation(
    conversation: Conversation
  ): Promise<LMResponse<GetConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(conversation);
      const resp = await LMChatClient.dlClient.getConversation(params);
      const convertedResp: GetConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async postConversation(
    postConversation: PostConversation
  ): Promise<LMResponse<GetConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(postConversation);
      const resp = await LMChatClient.dlClient.postConversation(params);
      const convertedResp: GetConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editConversation(
    conversationId: EditConversation
  ): Promise<LMResponse<GetConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(conversationId);
      const resp = await LMChatClient.dlClient.editConversation(params);
      const convertedResp: GetConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async deleteConversation(
    deleteConversation: DeleteConversation
  ): Promise<LMResponse<GetConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(deleteConversation);
      const resp = await LMChatClient.dlClient.deleteConversation(params);
      const convertedResp: GetConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async putReaction(
    putReaction: PutReaction
  ): Promise<LMResponse<PutReactionResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(putReaction);
      const resp = await LMChatClient.dlClient.putReaction(params);
      const convertedResp: PutReactionResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PutReactionResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<PutReactionResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async deleteReaction(
    deleteReaction: DeleteReaction
  ): Promise<LMResponse<PutReactionResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(deleteReaction);
      const resp = await LMChatClient.dlClient.deleteReaction(params);
      const convertedResp: PutReactionResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PutReactionResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<PutReactionResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async putMultimedia(
    putMultimedia: PutMultimedia
  ): Promise<LMResponse<PutMultimediaResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(putMultimedia);
      const resp = await LMChatClient.dlClient.putMultimedia(params);
      const convertedResp: PutMultimediaResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PutMultimediaResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<PutMultimediaResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async decodeUrl(
    decodeUrl: DecodeUrl
  ): Promise<LMResponse<DecodeUrlResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(decodeUrl);
      const resp = await LMChatClient.dlClient.decodeUrl(params);
      const convertedResp: DecodeUrlResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DecodeUrlResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DecodeUrlResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getReportTags(
    getReportTags: GetReportTags
  ): Promise<LMResponse<ReportTagResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(getReportTags);
      const resp = await LMChatClient.dlClient.getReportTags(params);
      const convertedResp: ReportTagResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ReportTagResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ReportTagResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async pushReport(
    pushReport: PushReport
  ): Promise<LMResponse<PushReportResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(pushReport);
      const resp = await LMChatClient.dlClient.pushReport(params);
      const convertedResp: PushReportResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PushReportResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<PushReportResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom
  ): Promise<LMResponse<ChatroomParticipantsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(leaveSecretChatroom);
      const resp = await LMChatClient.dlClient.leaveSecretChatroom(params);
      const convertedResp: ChatroomParticipantsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ChatroomParticipantsResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<ChatroomParticipantsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async profileData(
    profile: Profile
  ): Promise<LMResponse<ProfileDataResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(profile);
      const resp = await LMChatClient.dlClient.profileData(params);
      const convertedResp: ProfileDataResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ProfileDataResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ProfileDataResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async viewParticipants(
    participantsType: ParticipantsType
  ): Promise<LMResponse<ChatroomParticipantsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(participantsType);
      const resp = await LMChatClient.dlClient.viewParticipants(params);
      const convertedResp: ChatroomParticipantsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ChatroomParticipantsResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<ChatroomParticipantsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async conversationsFetch(
    cmetaType: CmetaType
  ): Promise<LMResponse<GetConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(cmetaType);
      const resp = await LMChatClient.dlClient.conversationsFetch(params);
      const convertedResp: GetConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //TODO
  // async fetchChatroomHome(chatroom: CHTYPE): Promise<any> {
  //   try {
  //     const params = ModelConverter.requestBodyGenerator(cmetaType);
  //     const resp = await LMChatClient.dlClient.conversationsFetch(params);
  //     const convertedResp: GetConversationResponse =
  //       ModelConverter.responseBodyParser(resp);
  //     return new LMResponse<GetConversationResponse>(convertedResp, null, true);
  //   } catch (error) {
  //     return new LMResponse<GetConversationResponse>(
  //       null,
  //       error.message || "An error occured",
  //       false
  //     );
  //   }

  async crSeenFn(crSeen: CRSeen): Promise<LMResponse<CRSeenResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(crSeen);
      const resp = await LMChatClient.dlClient.crSeenFn(params);
      const convertedResp: CRSeenResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CRSeenResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<CRSeenResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async chatroomSeen(chatroomSeen: ChatroomSeen): Promise<any> {
    try {
      const params = ModelConverter.requestBodyGenerator(chatroomSeen);
      const resp = await LMChatClient.dlClient.chatroomSeen(params);
      const convertedResp: CRSeenResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CRSeenResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<CRSeenResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //DIRECT MESSAGE

  // async fetchDMFeed(fetchDMFeed: FetchDMFeed): Promise<any> {
  //   try {
  //       const params = ModelConverter.requestBodyGenerator(fetchDMFeed);
  //       const resp = await LMChatClient.dlClient.conversationsFetch(params);
  //       const convertedResp: GetConversationResponse =
  //         ModelConverter.responseBodyParser(resp);
  //       return new LMResponse<GetConversationResponse>(convertedResp, null, true);
  //     } catch (error) {
  //       return new LMResponse<GetConversationResponse>(
  //         null,
  //         error.message || "An error occured",
  //         false
  //       );
  //     }
  // }

  async checkDMStatus(
    checkDMStatus: CheckDMStatus
  ): Promise<LMResponse<DMStatusResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(checkDMStatus);
      const resp = await LMChatClient.dlClient.checkDMStatus(params);
      const convertedResp: DMStatusResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMStatusResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMStatusResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async checkDMLimit(
    checkDMLimit: CheckDMLimit
  ): Promise<LMResponse<DMLimitResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(checkDMLimit);
      const resp = await LMChatClient.dlClient.checkDMLimit(params);
      const convertedResp: DMLimitResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMLimitResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMLimitResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //   async createDMChatroom(createDMChatroom: CreateDMChatroom): Promise<any> {
  //     try {
  //       const params = ModelConverter.requestBodyGenerator(createDMChatroom);
  //       const resp = await LMChatClient.dlClient.checkDMLimit(params);
  //       const convertedResp: DMLimitResponse =
  //         ModelConverter.responseBodyParser(resp);
  //       return new LMResponse<DMLimitResponse>(convertedResp, null, true);
  //     } catch (error) {
  //       return new LMResponse<DMLimitResponse>(
  //         null,
  //         error.message || "An error occured",
  //         false
  //       );
  //     }
  // }

  //check once
  async sendDMRequest(
    sendDMRequest: SendDMRequest
  ): Promise<LMResponse<SendDMRequestResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(sendDMRequest);
      const resp = await LMChatClient.dlClient.sendDMRequest(params);
      const convertedResp: SendDMRequestResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SendDMRequestResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SendDMRequestResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //check once
  async blockMember(blockMember: BlockMember): Promise<any> {
    try {
      const params = ModelConverter.requestBodyGenerator(blockMember);
      const resp = await LMChatClient.dlClient.blockMember(params);
      const convertedResp: SendDMRequestResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SendDMRequestResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SendDMRequestResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async checkDMTab(): Promise<LMResponse<CheckDMTabResponse>> {
    try {
      const resp = await LMChatClient.dlClient.checkDMTab();
      const convertedResp: CheckDMTabResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CheckDMTabResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<CheckDMTabResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getDMFeed(cid: CID): Promise<LMResponse<DMStatusResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getDMFeed(cid);
      const convertedResp: DMStatusResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMStatusResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMStatusResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async canDmFeed(dmCan: CANDM): Promise<LMResponse<DMStatusResponse>> {
    try {
      const resp = await LMChatClient.dlClient.canDmFeed(dmCan);
      const convertedResp: DMStatusResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMStatusResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMStatusResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //EXPLORE FEED
  async getExploreFeed(
    exploreFeedData: ExploreFeedData
  ): Promise<LMResponse<ExploreFeedResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getExploreFeed(exploreFeedData);
      const convertedResp: ExploreFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ExploreFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ExploreFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //HomeFeed
  async getHomeFeed(homeFeed: HomeFeed): Promise<LMResponse<HomeFeedResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getHomeFeed(homeFeed);
      const convertedResp: HomeFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<HomeFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<HomeFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //   async getInvites(invite: INVITE): Promise<any> {
  //     try {
  //       const resp = await LMChatClient.dlClient.getInvites(invite);
  //       const convertedResp: HomeFeedResponse =
  //         ModelConverter.responseBodyParser(resp);
  //       return new LMResponse<HomeFeedResponse>(convertedResp, null, true);
  //     } catch (error) {
  //       return new LMResponse<HomeFeedResponse>(
  //         null,
  //         error.message || "An error occured",
  //         false
  //       );
  //     }
  // }

  async sendInvites(
    participant: Participant
  ): Promise<LMResponse<SendInviteResponse>> {
    try {
      const resp = await LMChatClient.dlClient.sendInvites(participant);
      const convertedResp: SendInviteResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SendInviteResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SendInviteResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //   async registerDevice(device: Device): Promise<any> {
  //     try {
  //       const resp = await LMChatClient.dlClient.registerDevice(device);
  //       const convertedResp: SendInviteResponse =
  //         ModelConverter.responseBodyParser(resp);
  //       return new LMResponse<SendInviteResponse>(convertedResp, null, true);
  //     } catch (error) {
  //       return new LMResponse<SendInviteResponse>(
  //         null,
  //         error.message || "An error occured",
  //         false
  //       );
  //     }
  // }

  async inviteAction(
    iaType: IaType
  ): Promise<LMResponse<InviteActionResponse>> {
    try {
      const resp = await LMChatClient.dlClient.inviteAction(iaType);
      const convertedResp: InviteActionResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<InviteActionResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<InviteActionResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //   async fbInstance() {
  //     const fbDatabase = db;
  //     return fbDatabase;
  // }

  // homeFeedListener(callback: any, route: any) {
  //   const query = ref(db, route);
  //   return onValue(query, (snapshot) => {
  //       if (snapshot.exists()) {
  //           callback(snapshot.val());
  //       }
  //   });
  // }

  //POLL
  //check once
  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest
  ): Promise<LMResponse<PostPollConversationResponse>> {
    try {
      const resp = await LMChatClient.dlClient.postPollConversation(
        postPollConversationRequest
      );
      const convertedResp: PostPollConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PostPollConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<PostPollConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getPollUsers(
    getPollUsersRequest: GetPollUsersRequest
  ): Promise<LMResponse<GetPollUsersResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getPollUsers(
        getPollUsersRequest
      );
      const convertedResp: GetPollUsersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetPollUsersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetPollUsersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async addPollOption(
    addPollOptionRequest: AddPollOptionRequest
  ): Promise<LMResponse<AddPollResponse>> {
    try {
      const resp = await LMChatClient.dlClient.addPollOption(
        addPollOptionRequest
      );
      const convertedResp: AddPollResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<AddPollResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<AddPollResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async submitPoll(
    submitPollRequest: SubmitPollRequest
  ): Promise<LMResponse<SubmitPollResponse>> {
    try {
      const resp = await LMChatClient.dlClient.submitPoll(submitPollRequest);
      const convertedResp: SubmitPollResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SubmitPollResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SubmitPollResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //Search
  //check once
  async searchChatroom(
    searchType: SearchType
  ): Promise<LMResponse<SearchChatroomResponse>> {
    try {
      const resp = await LMChatClient.dlClient.searchChatroom(searchType);
      const convertedResp: SearchChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchChatroomResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SearchChatroomResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //check once
  async searchConversation(
    searchConversation: SearchConversation
  ): Promise<LMResponse<SearchConversationResponse>> {
    try {
      const resp = await LMChatClient.dlClient.searchConversation(
        searchConversation
      );
      const convertedResp: SearchConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<SearchConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //User
  async initiateUser(
    initUser: InitUser
  ): Promise<LMResponse<InitUserResponse>> {
    try {
      const resp = await LMChatClient.dlClient.initiateUser(initUser);
      const convertedResp: InitUserResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<InitUserResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<InitUserResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async logout(logout: Logout): Promise<LMResponse<LogoutUserResponse>> {
    try {
      const resp = await LMChatClient.dlClient.logout(logout);
      const convertedResp: LogoutUserResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<LogoutUserResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<LogoutUserResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //check once
  async getProfile(
    getProfile: GetProfile
  ): Promise<LMResponse<GetProfileResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getProfile(getProfile);
      const convertedResp: GetProfileResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetProfileResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetProfileResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getMemberChatroom(
    getMemberChatroom: GetMemberChatroom
  ): Promise<LMResponse<GetMemberResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getMemberChatroom(
        getMemberChatroom
      );
      const convertedResp: GetMemberResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetMemberResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetMemberResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getQuestions(): Promise<LMResponse<GetQuestionsResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getQuestions();
      const convertedResp: GetQuestionsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetQuestionsResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetQuestionsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getMemberState(): Promise<LMResponse<GetMemberStateResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getMemberState();
      const convertedResp: GetMemberStateResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetMemberStateResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetMemberStateResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editProfile(
    editProfile: EditProfile
  ): Promise<LMResponse<EditProfileResponse>> {
    try {
      const resp = await LMChatClient.dlClient.editProfile(editProfile);
      const convertedResp: EditProfileResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<EditProfileResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<EditProfileResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async searchMembers(
    search: Search
  ): Promise<LMResponse<SearchMembersResponse>> {
    try {
      const resp = await LMChatClient.dlClient.searchMembers(search);
      const convertedResp: SearchMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchMembersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SearchMembersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getAllMembers(
    getAllMembers: GetAllMembers
  ): Promise<LMResponse<GetAllMembersResponse>> {
    try {
      const resp = await LMChatClient.dlClient.getAllMembers(getAllMembers);
      const convertedResp: GetAllMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetAllMembersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetAllMembersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  //   dmAllMembers(userType: USERTYPE): Promise<any> {
  //     return this.networkLibrary.makeAuthenticatedRequest(
  //         `${environment.apiUrl}${API.DM_ALL_MEMBERS}?community_id=${userType.community_id}&member_state=${userType.member_state}&page=${userType.page}`
  //     );
  // }

  // allMembers(userType: USERTYPE): Promise<any> {
  //     return this.networkLibrary.makeAuthenticatedRequest(
  //         `${environment.apiUrl}${API.COMMUNITY_MEMBERS}?community_id=${userType.community_id}&chatroom_id=${userType.chatroom_id}&page=${userType.page}`
  //     );
  // }
}

export { LMChatClient as default };
