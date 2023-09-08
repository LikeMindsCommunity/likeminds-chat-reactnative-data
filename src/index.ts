import DLClient from "@likeminds.community/chat-js";

//Chatroom
import ChatroomClient from "./pages/chatroom/chatroomClient";
import {
  FollowChatroom,
  MuteChatroom,
  Chatroom as ChatroomRequest,
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
  ParticipantsType,
  CmetaType,
  CHTYPE,
  CRSeen,
  ChatroomSeen,
  FollowChatroomWithUuid,
  ChatroomSeenWithUuid,
} from "@likeminds.community/chat-js/dist/pages/chatroom/types";
import LMResponse from "../src/core/services/lmresponse";
import { Chatroom } from "./shared/responseModels/Chatroom";
import { ShareChatroomUrlResponse } from "./pages/chatroom/responseModels/ShareChatroomUrlResponse";
import { GetTaggingListResponse } from "./pages/chatroom/responseModels/GetTaggingListResponse";
import { GetConversationsResponse } from "./pages/chatroom/responseModels/GetConversationsResponse";
import { PutMultimediaResponse } from "./pages/chatroom/responseModels/PutMultimediaResponse";
import { DecodeUrlResponse } from "./pages/chatroom/responseModels/DecodeUrlResponse";
import { Nothing } from "./shared/responseModels/Nothing";
import { PostConversationsResponse } from "./pages/chatroom/responseModels/PostConversationResponse";
import { EditConversationResponse } from "./pages/chatroom/responseModels/EditConversationResponse";
import { DeleteConversationsResponse } from "./pages/chatroom/responseModels/DeleteConversationsResponse";
import { GetReportTagsResponse } from "./pages/chatroom/responseModels/GetReportTagsResponse";
import { FetchConversationResponse } from "./pages/chatroom/responseModels/FetchConversationResponse";

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
  CreateDMChatroomWithUuid,
  CheckDMLimitWithUuid,
  CANDMWithUuid,
} from "@likeminds.community/chat-js/dist/pages/direct-message/types";
import { DMStatusResponse } from "./pages/directMessage/responseModels/DMStatusResponse";
import { DMLimitResponse } from "./pages/directMessage/responseModels/DMLimitResponse";
import { SendDMRequestResponse } from "./pages/directMessage/responseModels/SendDMRequestResponse";
import { CheckDMTabResponse } from "./pages/directMessage/responseModels/CheckDMTabResponse";
import DirectMessageClient from "./pages/directMessage/directMessageClient";
import { CreateDMChatroomResponse } from "./pages/directMessage/responseModels/CreateDMChatroomResponse";
import { FetchDMResponse } from "./pages/directMessage/responseModels/FetchDMResponse";
import { BlockDMRequestResponse } from "./pages/directMessage/responseModels/BlockDMRequestResponse";
import { GetDMFeedResponse } from "./pages/directMessage/responseModels/GetDMFeedResponse";
import { CanDMFeedResponse } from "./pages/directMessage/responseModels/CanDMFeedResponse";

//Explore Feed
import { ExploreFeedData } from "@likeminds.community/chat-js/dist/pages/explore-feed/types";
import { ExploreFeedResponse } from "./pages/exploreFeed/responseModels/ExploreFeedResponse";
import ExploreFeedClient from "./pages/exploreFeed/exploreFeedClient";

//HomeFeed
import {
  HomeFeed,
  CRid,
  INVITE,
  IaType,
  Device,
  Participant,
} from "@likeminds.community/chat-js/dist/pages/home-feed/types";
import { HomeFeedResponse } from "./pages/homeFeed/responseModels/HomeFeedResponse";
import HomeFeedClient from "./pages/homeFeed/homeFeedClient";
import { GetInvitesResponse } from "./pages/homeFeed/responseModels/GetInvitesResponse";

//Poll
import {
  PostPollConversationRequest,
  GetPollUsersRequest,
  AddPollOptionRequest,
  SubmitPollRequest,
} from "@likeminds.community/chat-js/dist/pages/poll/types";
import { PostPollConversationResponse } from "./pages/poll/responseModels/PostPollConversationResponse";
import { GetPollUsersResponse } from "./pages/poll/responseModels/GetPollUserResponse";
import { AddPollResponse } from "./pages/poll/responseModels/AddPollResponse";
import PollClient from "./pages/poll/pollClient";

//Search
import {
  SearchType,
  SearchConversation,
} from "@likeminds.community/chat-js/dist/pages/search/types";
import { SearchChatroomResponse } from "./pages/search/responseModels/SearchChatroomResponse";
import { SearchConversationResponse } from "./pages/search/responseModels/SearchConversationResponse";
import SearchClient from "./pages/search/searchClient";

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
  InitUserWithUuid,
} from "@likeminds.community/chat-js/dist/pages/user/types";
import { InitiateUserResponse } from "./pages/user/responseModels/InitUserResponse";
import { GetMemberStateResponse } from "./pages/user/responseModels/GetMemberStateResponse";
import { SearchMembersResponse } from "./pages/user/responseModels/SearchMembersResponse";
import { GetAllMembersResponse } from "./pages/user/responseModels/GetAllMemberResponse";
import UserClient from "./pages/user/userClient";
import SyncClient from "./sync/api";
import SyncChatroomRequest from "./sync/model/syncChatroomRequest";
import { SyncChatroomResponse } from "./sync/model/syncChatroomResponse";
import SyncConversationRequest from "./sync/model/syncConversationRequest";
import { SyncConversationResponse } from "./sync/model/syncConversationResponse";
import {
  getAllChatroomData,
  deleteOneChatroom,
  getChatroomData,
  getCommunityData,
  getTimeStamp,
  saveChatroomResponse,
  saveCommunityData,
  saveTimeStamp,
  updateMuteStatus,
  updateTimeStamp,
  updateUnseenCount,
} from "./Data/Db/dbhelper";
import Db from "./Data/Db/db";

class LMChatClient {
  private static apiKey: string | null = null;
  private static platformCode: string | null = null;
  private static versionCode: number | null = null;
  private static dlClient: DLClient;

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

    LMChatClient.dlClient = new DLClient({
      xApiKey: this.apiKey!,
      xPlatformCode: this.platformCode!,
      xVersionCode: this.versionCode!,
      xSdkSource: "chat",
    });

    const lmChatClient = new LMChatClient();

    return lmChatClient;
  }

  chatroomClient = new ChatroomClient();
  directMessageClient = new DirectMessageClient();
  exploreFeedClient = new ExploreFeedClient();
  homeFeedClient = new HomeFeedClient();
  pollClient = new PollClient();
  searchClient = new SearchClient();
  userClient = new UserClient();
  syncClient = new SyncClient();

  async muteChatroom(muteChatroom: MuteChatroom): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.muteChatroom(
      muteChatroom,
      LMChatClient.dlClient
    );
  }

  async followChatroom(
    followChatroom: FollowChatroomWithUuid
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.followChatroom(
      followChatroom,
      LMChatClient.dlClient
    );
  }

  async getChatroom(chatroom: ChatroomRequest): Promise<LMResponse<Chatroom>> {
    return this.chatroomClient.getChatroom(chatroom, LMChatClient.dlClient);
  }

  async markReadChatroom(markRead: MarkRead): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.markReadChatroom(
      markRead,
      LMChatClient.dlClient
    );
  }

  async shareChatroomUrl(
    shareChatroom: ShareChatroom
  ): Promise<LMResponse<ShareChatroomUrlResponse>> {
    return this.chatroomClient.shareChatroomUrl(
      shareChatroom,
      LMChatClient.dlClient
    );
  }

  async setChatroomTopic(
    setChatroom: SetChatroom
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.setChatroomTopic(
      setChatroom,
      LMChatClient.dlClient
    );
  }

  async getTaggingList(
    taggingList: TaggingList
  ): Promise<LMResponse<GetTaggingListResponse>> {
    return this.chatroomClient.getTaggingList(
      taggingList,
      LMChatClient.dlClient
    );
  }

  async getConversations(
    conversation: Conversation
  ): Promise<LMResponse<GetConversationsResponse>> {
    return this.chatroomClient.getConversations(
      conversation,
      LMChatClient.dlClient
    );
  }

  async postConversation(
    postConversation: PostConversation
  ): Promise<LMResponse<PostConversationsResponse>> {
    return this.chatroomClient.postConversation(
      postConversation,
      LMChatClient.dlClient
    );
  }

  async editConversation(
    conversationId: EditConversation
  ): Promise<LMResponse<EditConversationResponse>> {
    return this.chatroomClient.editConversation(
      conversationId,
      LMChatClient.dlClient
    );
  }

  async deleteConversations(
    deleteConversation: DeleteConversation
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    return this.chatroomClient.deleteConversations(
      deleteConversation,
      LMChatClient.dlClient
    );
  }

  async putReaction(putReaction: PutReaction): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.putReaction(putReaction, LMChatClient.dlClient);
  }

  async deleteReaction(
    deleteReaction: DeleteReaction
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.deleteReaction(
      deleteReaction,
      LMChatClient.dlClient
    );
  }

  async putMultimedia(
    putMultimedia: PutMultimedia
  ): Promise<LMResponse<PutMultimediaResponse>> {
    return this.chatroomClient.putMultimedia(
      putMultimedia,
      LMChatClient.dlClient
    );
  }

  async decodeUrl(
    decodeUrl: DecodeUrl
  ): Promise<LMResponse<DecodeUrlResponse>> {
    return this.chatroomClient.decodeUrl(decodeUrl, LMChatClient.dlClient);
  }

  async getReportTags(
    getReportTags: GetReportTags
  ): Promise<LMResponse<GetReportTagsResponse>> {
    return this.chatroomClient.getReportTags(
      getReportTags,
      LMChatClient.dlClient
    );
  }

  async postReport(postReport: PushReport): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.postReport(postReport, LMChatClient.dlClient);
  }

  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.leaveSecretChatroom(
      leaveSecretChatroom,
      LMChatClient.dlClient
    );
  }

  async getParticipants(
    participantsType: ParticipantsType
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.getParticipants(
      participantsType,
      LMChatClient.dlClient
    );
  }

  async getConversationMeta(
    cmetaType: CmetaType
  ): Promise<LMResponse<FetchConversationResponse>> {
    return this.chatroomClient.getConversationMeta(
      cmetaType,
      LMChatClient.dlClient
    );
  }

  async chatroomSeen(
    chatroomSeen: ChatroomSeenWithUuid
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.chatroomSeen(
      chatroomSeen,
      LMChatClient.dlClient
    );
  }

  //DM
  async fetchDMFeed(
    fetchDMFeed: FetchDMFeed
  ): Promise<LMResponse<FetchDMResponse>> {
    return this.directMessageClient.fetchDMFeed(
      fetchDMFeed,
      LMChatClient.dlClient
    );
  }

  async checkDMStatus(
    checkDMStatus: CheckDMStatus
  ): Promise<LMResponse<DMStatusResponse>> {
    return this.directMessageClient.checkDMStatus(
      checkDMStatus,
      LMChatClient.dlClient
    );
  }

  async checkDMLimit(
    checkDMLimit: CheckDMLimitWithUuid
  ): Promise<LMResponse<DMLimitResponse>> {
    return this.directMessageClient.checkDMLimit(
      checkDMLimit,
      LMChatClient.dlClient
    );
  }

  async createDMChatroom(
    createDMChatroom: CreateDMChatroomWithUuid
  ): Promise<LMResponse<CreateDMChatroomResponse>> {
    return this.directMessageClient.createDMChatroom(
      createDMChatroom,
      LMChatClient.dlClient
    );
  }

  async sendDMRequest(
    sendDMRequest: SendDMRequest
  ): Promise<LMResponse<SendDMRequestResponse>> {
    return this.directMessageClient.sendDMRequest(
      sendDMRequest,
      LMChatClient.dlClient
    );
  }

  async blockMember(
    blockMember: BlockMember
  ): Promise<LMResponse<BlockDMRequestResponse>> {
    return this.directMessageClient.blockMember(
      blockMember,
      LMChatClient.dlClient
    );
  }

  async checkDMTab(): Promise<LMResponse<CheckDMTabResponse>> {
    return this.directMessageClient.checkDMTab(LMChatClient.dlClient);
  }

  async canDmFeed(
    dmCan: CANDMWithUuid
  ): Promise<LMResponse<CanDMFeedResponse>> {
    return this.directMessageClient.canDmFeed(dmCan, LMChatClient.dlClient);
  }

  //ExploreFeed
  async getExploreFeed(
    exploreFeedData: ExploreFeedData
  ): Promise<LMResponse<ExploreFeedResponse>> {
    return this.exploreFeedClient.getExploreFeed(
      exploreFeedData,
      LMChatClient.dlClient
    );
  }

  //HomeFeed
  async getHomeFeed(homeFeed: HomeFeed): Promise<LMResponse<HomeFeedResponse>> {
    return this.homeFeedClient.getHomeFeed(homeFeed, LMChatClient.dlClient);
  }

  async getInvites(invite: INVITE): Promise<LMResponse<GetInvitesResponse>> {
    return this.homeFeedClient.getInvites(invite, LMChatClient.dlClient);
  }

  async sendInvites(participant: Participant): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.sendInvites(participant, LMChatClient.dlClient);
  }

  async registerDevice(device: Device): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.registerDevice(device, LMChatClient.dlClient);
  }

  async inviteAction(iaType: IaType): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.inviteAction(iaType, LMChatClient.dlClient);
  }

  firebaseInstance() {
    return this.homeFeedClient.firebaseInstance(LMChatClient.dlClient);
  }

  homeFeedListener(callback: any, route: any) {
    return this.homeFeedClient.homeFeedListener(
      callback,
      route,
      LMChatClient.dlClient
    );
  }

  //Poll
  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest
  ): Promise<LMResponse<PostPollConversationResponse>> {
    return this.pollClient.postPollConversation(
      postPollConversationRequest,
      LMChatClient.dlClient
    );
  }

  async getPollUsers(
    getPollUsersRequest: GetPollUsersRequest
  ): Promise<LMResponse<GetPollUsersResponse>> {
    return this.pollClient.getPollUsers(
      getPollUsersRequest,
      LMChatClient.dlClient
    );
  }

  async addPollOption(
    addPollOptionRequest: AddPollOptionRequest
  ): Promise<LMResponse<AddPollResponse>> {
    return this.pollClient.addPollOption(
      addPollOptionRequest,
      LMChatClient.dlClient
    );
  }

  async submitPoll(
    submitPollRequest: SubmitPollRequest
  ): Promise<LMResponse<Nothing>> {
    return this.pollClient.submitPoll(submitPollRequest, LMChatClient.dlClient);
  }

  //Search
  async searchChatroom(
    searchType: SearchType
  ): Promise<LMResponse<SearchChatroomResponse>> {
    return this.searchClient.searchChatroom(searchType, LMChatClient.dlClient);
  }

  async searchConversation(
    searchConversation: SearchConversation
  ): Promise<LMResponse<SearchConversationResponse>> {
    return this.searchClient.searchConversation(
      searchConversation,
      LMChatClient.dlClient
    );
  }

  //User
  initiateUser(
    initUser: InitUserWithUuid
  ): Promise<LMResponse<InitiateUserResponse>> {
    return this.userClient.initiateUser(initUser, LMChatClient.dlClient);
  }

  async logout(logout: Logout): Promise<LMResponse<Nothing>> {
    return this.userClient.logout(logout, LMChatClient.dlClient);
  }

  async getMemberState(): Promise<LMResponse<GetMemberStateResponse>> {
    return this.userClient.getMemberState(LMChatClient.dlClient);
  }

  async searchMembers(
    search: Search
  ): Promise<LMResponse<SearchMembersResponse>> {
    return this.userClient.searchMembers(search, LMChatClient.dlClient);
  }

  async getAllMembers(
    getAllMembers: GetAllMembers
  ): Promise<LMResponse<GetAllMembersResponse>> {
    return this.userClient.getAllMembers(getAllMembers, LMChatClient.dlClient);
  }

  // Sync
  async syncChatroom(
    request: SyncChatroomRequest
  ): Promise<LMResponse<SyncChatroomResponse>> {
    return this.syncClient.syncChatroom(request, LMChatClient.dlClient);
  }

  async syncConversation(
    request: SyncConversationRequest
  ): Promise<LMResponse<SyncConversationResponse>> {
    return this.syncClient.syncConversation(request, LMChatClient.dlClient);
  }

  saveCommunityData(communityData) {
    return saveCommunityData(communityData);
  }
  async saveChatroomResponse(data: any, chatrooms: any[], communityId: string) {
    return saveChatroomResponse(data, chatrooms, communityId);
  }
  getCommunityData() {
    return getCommunityData();
  }
  getAllChatroomData() {
    return getAllChatroomData();
  }
  getChatroomData(chatroomId: string) {
    return getChatroomData(chatroomId);
  }
  updateTimeStamp(minTimeStamp: number, maxTimeStamp: number) {
    return updateTimeStamp(minTimeStamp, maxTimeStamp);
  }
  saveTimeStamp(minTimeStamp: number, maxTimeStamp: number) {
    return saveTimeStamp(minTimeStamp, maxTimeStamp);
  }
  getTimeStamp() {
    return getTimeStamp();
  }
  deleteOneChatroom(chatroomId: string) {
    return deleteOneChatroom(chatroomId);
  }
  updateMuteStatus(chatroomId: string, muteStats: boolean) {
    return updateMuteStatus(chatroomId, muteStats);
  }
  updateUnseenCount(chatroomId: string) {
    return updateUnseenCount(chatroomId);
  }
  getInstance() {
    return Db.getInstance();
  }
}

export { LMChatClient, SyncChatroomRequest, SyncConversationRequest };
