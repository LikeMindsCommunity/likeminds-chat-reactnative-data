//Chatroom & Conversation
import ChatroomClient from "./pages/chatroom/chatroomClient";
import { Chatroom as ChatroomModel } from "./shared/responseModels/Chatroom";
import { Conversation as ConversationModel } from "./shared/responseModels/Conversation";
import {
  MuteChatroom,
  Chatroom as ChatroomRequest,
  MarkRead,
  ShareChatroom,
  SetChatroom,
  TaggingList,
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
  FollowChatroomWithUuid,
  ChatroomSeenWithUuid,
} from "@likeminds.community/chat-js/dist/pages/chatroom/types";
import LMResponse from "../src/core/services/lmresponse";
import { ShareChatroomUrlResponse } from "./pages/chatroom/responseModels/ShareChatroomUrlResponse";
import { GetTaggingListResponse } from "./pages/chatroom/responseModels/GetTaggingListResponse";
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
  FetchDMFeedRequest,
  CheckDMStatus,
  SendDMRequest,
  BlockMember,
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
import { CanDMFeedResponse } from "./pages/directMessage/responseModels/CanDMFeedResponse";

//Explore Feed
import { ExploreFeedData } from "@likeminds.community/chat-js/dist/pages/explore-feed/types";
import { ExploreFeedResponse } from "./pages/exploreFeed/responseModels/ExploreFeedResponse";
import ExploreFeedClient from "./pages/exploreFeed/exploreFeedClient";

//HomeFeed
import {
  GetHomeFeedRequest,
  INVITE,
  IaType,
  Device,
  Participant,
} from "@likeminds.community/chat-js/dist/pages/home-feed/types";
import { HomeFeedResponse } from "./pages/homeFeed/responseModels/HomeFeedResponse";
import HomeFeedClient from "./pages/homeFeed/homeFeedClient";
import { GetInvitesResponse } from "./pages/homeFeed/responseModels/GetInvitesResponse";
import { ConversationState } from "./enums/ConversationState";

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
  GetAllMembers,
  Logout,
  Search,
  EditProfile,
  LeaveCommunity,
  InitUserWithUuid,
  ValidateUser,
} from "@likeminds.community/chat-js/dist/pages/user/types";
import { InitiateUserResponse } from "./pages/user/responseModels/InitUserResponse";
import { GetMemberStateResponse } from "./pages/user/responseModels/GetMemberStateResponse";
import { SearchMembersResponse } from "./pages/user/responseModels/SearchMembersResponse";
import { GetAllMembersResponse } from "./pages/user/responseModels/GetAllMemberResponse";
import UserClient from "./pages/user/userClient";
import SyncClient from "./sync/api";
import SyncChatroomRequest from "./sync/model/syncChatroomRequest";
import GetConversationsRequestBuilder from "./localDb/models/requestModels/GetConversationsRequestBuilder";
import { SyncChatroomResponse } from "./sync/model/syncChatroomResponse";
import SyncConversationRequest from "./sync/model/syncConversationRequest";
import { SyncConversationResponse } from "./sync/model/syncConversationResponse";
import {
  getAllAttachmentUploadConversations,
  removeAttactmentUploadConversationByKey,
  saveAttachmentUploadConversation,
} from "./localDb/db/queries/attachments";
import {
  getTimeStamp,
  initiateTimeStamp,
  updateTimeStamp,
} from "./localDb/db/queries/timeStamp";
import {
  deleteConversation,
  updateConversation,
  saveNewConversation,
  saveConversationData,
  replaceSavedConversation,
  getConversation,
  getConversations,
  updatePollVotes,
  updateDeletedBy,
  deleteConversationFromRealm,
} from "./localDb/db/queries/conversation";
import {
  updateChatroomViewed,
  getChatroom,
  getChatrooms,
  getFilteredChatrooms,
  saveChatroomResponse,
  updateChatRequestState,
  updateChatroomFollowStatus,
  updateUnseenCount,
  updateMuteStatus,
} from "./localDb/db/queries/chatroom";
import { saveCommunity, getCommunity } from "./localDb/db/queries/community";
import Db from "./localDb/db/db";
import { GetExploreTabCountResponse } from "./pages/homeFeed/responseModels/GetExploreTabCountResponse";
import { Member } from "./shared/responseModels/Member";
import { GetChatroomResponse } from "./pages/chatroom/responseModels/GetChatroomResponse";
import {
  getAppConfig,
  initiateAppConfig,
  setAppConfig,
} from "./localDb/db/queries/appConfig";
import { GetConversationsRequest } from "./localDb/models/requestModels/GetConversationsRequest";
import { GetConversationNotificationUnreadResponse } from "./pages/chatroom/responseModels/GetConversationNotificationUnreadResponse";
import { getUserSchema, setUserSchema } from "./localDb/db/queries/userSchema";
import { setFilterConversationState } from "./localDb/db/queries/filterConversationState";
import DLClient, { LMSDKCallbacks } from "@likeminds.community/chat-js";
import { AddMemberToCohort } from "./pages/user/responseModels/AddMemberToCohort";
import RNInitiateUserClient from "./initiateUser/RNInitiateUserClient";
import NetworkLibrary from "@likeminds.community/chat-js/dist/core/services/networklibrary";
import DBLibrary from "./core/services/networkLibrary";

class LMChatClient {
  private static versionCode: number | null = null;
  private static filterConversationState: number[] | null = null;
  // private static apiKey: string | null = null;
  public static dlClient: DLClient;
  private networkLibrary: NetworkLibrary;
  private chatroomClient: ChatroomClient;
  private directMessageClient: DirectMessageClient;
  private exploreFeedClient: ExploreFeedClient;
  private homeFeedClient: HomeFeedClient;
  private pollClient: PollClient;
  private searchClient: SearchClient;
  private userClient: UserClient;
  private syncClient: SyncClient;
  private rnInitiateUserClient: RNInitiateUserClient;
  private lmSdkCallbacks: LMSDKCallbacks;
  private dbLibrary: DBLibrary;

  constructor() {
    this.networkLibrary = LMChatClient.dlClient.getNetworkLibrary();
    this.chatroomClient = new ChatroomClient();
    this.directMessageClient = new DirectMessageClient();
    this.exploreFeedClient = new ExploreFeedClient();
    this.homeFeedClient = new HomeFeedClient();
    this.pollClient = new PollClient();
    this.searchClient = new SearchClient();
    this.userClient = new UserClient();
    this.syncClient = new SyncClient();
    this.rnInitiateUserClient = new RNInitiateUserClient(
      this.networkLibrary,
      LMChatClient.dlClient,
      LMChatClient.versionCode,
      "rn",
      this.lmSdkCallbacks
    );
    this.dbLibrary = new DBLibrary(
      LMChatClient.dlClient,
      LMChatClient.versionCode,
      "rn",
      this.lmSdkCallbacks
    );
  }

  // static setApiKey(apiKey: string) {
  //   this.apiKey = apiKey;
  //   return this;
  // }

  static setVersionCode(versionCode: number) {
    this.versionCode = versionCode;
    return this;
  }

  static setfilterStateConversation(
    filterConversationState: ConversationState[]
  ) {
    this.filterConversationState = filterConversationState;
    return this;
  }

  public static build(): LMChatClient {
    // Perform any necessary validation or configuration checks
    if (!this.versionCode) {
      throw new Error(
        "Please provide versionCode before building the LMFeedClient."
      );
    }
    // if (!this.apiKey) {
    //   throw new Error(
    //     "Please provide apiKey before building the LMChatClient."
    //   );
    // }

    LMChatClient.dlClient = new DLClient({
      // xApiKey: this.apiKey!,
      xPlatformCode: "rn",
      xVersionCode: this.versionCode,
      xSdkSource: "chat",
      excludedConversationStates:[]
    });

    setFilterConversationState(this.filterConversationState);

    const lmChatClient = new LMChatClient();

    console.log("lmChatClient", lmChatClient);

    return lmChatClient;
  }

  public setLMSDKCallbacks(lmSdkCallbacks: LMSDKCallbacks) {
    this.lmSdkCallbacks = lmSdkCallbacks;
    this.networkLibrary.setLMSDKCallbacks(lmSdkCallbacks);
  }
  public setTokens(accessToken: string, refreshToken: string) {
    this.dbLibrary.setTokens(accessToken, refreshToken);
  }

  public setUserInLocalStorage(user: string) {
    this.dbLibrary.setUserInLocalStorage(user);
  }
  public async getUserFromLocalStorage() {
    return this.dbLibrary.getUserFromRNLocalStorage();
  }

  public async getTokens() {
    return this.dbLibrary.getTokens();
  }

  public async getAccessToken() {
    return this.networkLibrary.getAccessToken();
  }

  public async getRefreshToken() {
    return this.networkLibrary.getRefreshToken();
  }

  async validateUser(validateUserRequest: ValidateUser) {
    try {
      const initiateUserResponse =
        await this.rnInitiateUserClient.validateUser(validateUserRequest);

      return initiateUserResponse;
    } catch (error) {
      console.error("Error while validating the user:", error);
      throw error;
    }
  }

  async initiateUser(initiateUserRequest: InitUserWithUuid) {
    try {
      const initiateUserResponse =
        await this.rnInitiateUserClient.initiateUser(initiateUserRequest);

      return initiateUserResponse;
    } catch (error) {
      console.error("Error while initiating the user:", error);
      throw error;
    }
  }

  // Method to mute a chatroom
  async muteChatroom(muteChatroom: MuteChatroom): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.muteChatroom(
      muteChatroom,
      LMChatClient.dlClient
    );
  }

  // Method to follow a chatroom
  async followChatroom(
    followChatroom: FollowChatroomWithUuid
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.followChatroom(
      followChatroom,
      LMChatClient.dlClient
    );
  }

  // Method to get a chatroom
  async getChatroom(chatroomId: string): Promise<LMResponse<ChatroomModel>> {
    return getChatroom(chatroomId);
  }

  // Method to mark a chatroom as read
  async markReadChatroom(markRead: MarkRead): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.markReadChatroom(
      markRead,
      LMChatClient.dlClient
    );
  }

  // Method to share chatroom url
  async shareChatroomUrl(
    shareChatroom: ShareChatroom
  ): Promise<LMResponse<ShareChatroomUrlResponse>> {
    return this.chatroomClient.shareChatroomUrl(
      shareChatroom,
      LMChatClient.dlClient
    );
  }

  // Method to set chatroom topic
  async setChatroomTopic(
    setChatroom: SetChatroom,
    conversation: ConversationModel
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.setChatroomTopic(
      setChatroom,
      LMChatClient.dlClient,
      conversation
    );
  }

  // Method to get tagging list
  async getTaggingList(
    taggingList: TaggingList
  ): Promise<LMResponse<GetTaggingListResponse>> {
    return this.chatroomClient.getTaggingList(
      taggingList,
      LMChatClient.dlClient
    );
  }

  // Method to post a conversation
  async postConversation(
    postConversation: PostConversation
  ): Promise<LMResponse<PostConversationsResponse>> {
    return this.chatroomClient.postConversation(
      postConversation,
      LMChatClient.dlClient
    );
  }

  // Method to edit a conversation
  async editConversation(
    editConversation: EditConversation,
    conversation?: ConversationModel
  ): Promise<LMResponse<EditConversationResponse>> {
    return this.chatroomClient.editConversation(
      editConversation,
      LMChatClient.dlClient,
      conversation
    );
  }

  // Method to delete a conversation
  async deleteConversations(
    deleteConversation: DeleteConversation
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    return this.chatroomClient.deleteConversations(
      deleteConversation,
      LMChatClient.dlClient
    );
  }

  // Method to put a reaction to a conversation
  async putReaction(putReaction: PutReaction): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.putReaction(putReaction, LMChatClient.dlClient);
  }

  // Method to delete a reaction
  async deleteReaction(
    deleteReaction: DeleteReaction
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.deleteReaction(
      deleteReaction,
      LMChatClient.dlClient
    );
  }

  // Method to upload multimedia
  async putMultimedia(
    putMultimedia: PutMultimedia
  ): Promise<LMResponse<PutMultimediaResponse>> {
    return this.chatroomClient.putMultimedia(
      putMultimedia,
      LMChatClient.dlClient
    );
  }

  // Method to decode an url
  async decodeUrl(
    decodeUrl: DecodeUrl
  ): Promise<LMResponse<DecodeUrlResponse>> {
    return this.chatroomClient.decodeUrl(decodeUrl, LMChatClient.dlClient);
  }

  // Method to get report tags
  async getReportTags(
    getReportTags: GetReportTags
  ): Promise<LMResponse<GetReportTagsResponse>> {
    return this.chatroomClient.getReportTags(
      getReportTags,
      LMChatClient.dlClient
    );
  }

  // Method to post a report
  async postReport(postReport: PushReport): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.postReport(postReport, LMChatClient.dlClient);
  }

  // Method to leave secret chatroom
  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.leaveSecretChatroom(
      leaveSecretChatroom,
      LMChatClient.dlClient
    );
  }

  // Method to get participants
  async getParticipants(
    participantsType: ParticipantsType
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.getParticipants(
      participantsType,
      LMChatClient.dlClient
    );
  }

  // Method to get conversation meta
  async getConversationMeta(
    cmetaType: CmetaType
  ): Promise<LMResponse<FetchConversationResponse>> {
    return this.chatroomClient.getConversationMeta(
      cmetaType,
      LMChatClient.dlClient
    );
  }

  // Method for chatroomSeen
  async chatroomSeen(
    chatroomSeen: ChatroomSeenWithUuid
  ): Promise<LMResponse<Nothing>> {
    return this.chatroomClient.chatroomSeen(
      chatroomSeen,
      LMChatClient.dlClient
    );
  }

  // Method to get unread conversation notification
  async getUnreadConversationNotification(): Promise<
    LMResponse<GetConversationNotificationUnreadResponse>
  > {
    return this.chatroomClient.getUnreadConversationNotification(
      LMChatClient.dlClient
    );
  }

  async getUnseenCount() {
    return this.chatroomClient.getUnseenCount(LMChatClient.dlClient)
  }

  // Method to fetch DM feed
  async fetchDMFeed(
    fetchDMFeed: FetchDMFeedRequest
  ): Promise<LMResponse<FetchDMResponse>> {
    return this.directMessageClient.fetchDMFeed(
      fetchDMFeed,
      LMChatClient.dlClient
    );
  }

  // Method to check DM status
  async checkDMStatus(
    checkDMStatus: CheckDMStatus
  ): Promise<LMResponse<DMStatusResponse>> {
    return this.directMessageClient.checkDMStatus(
      checkDMStatus,
      LMChatClient.dlClient
    );
  }

  // Method to check DM limit
  async checkDMLimit(
    checkDMLimit: CheckDMLimitWithUuid
  ): Promise<LMResponse<DMLimitResponse>> {
    return this.directMessageClient.checkDMLimit(
      checkDMLimit,
      LMChatClient.dlClient
    );
  }

  // Method to create a DM Chatroom
  async createDMChatroom(
    createDMChatroom: CreateDMChatroomWithUuid
  ): Promise<LMResponse<CreateDMChatroomResponse>> {
    return this.directMessageClient.createDMChatroom(
      createDMChatroom,
      LMChatClient.dlClient
    );
  }

  // Method to send a DM Request
  async sendDMRequest(
    sendDMRequest: SendDMRequest
  ): Promise<LMResponse<SendDMRequestResponse>> {
    return this.directMessageClient.sendDMRequest(
      sendDMRequest,
      LMChatClient.dlClient
    );
  }

  // Method to block a member
  async blockMember(
    blockMember: BlockMember
  ): Promise<LMResponse<BlockDMRequestResponse>> {
    return this.directMessageClient.blockMember(
      blockMember,
      LMChatClient.dlClient
    );
  }

  // Method to check dm tab
  async checkDMTab(): Promise<LMResponse<CheckDMTabResponse>> {
    return this.directMessageClient.checkDMTab(LMChatClient.dlClient);
  }

  // Method for canDmFeed
  async canDmFeed(
    dmCan: CANDMWithUuid
  ): Promise<LMResponse<CanDMFeedResponse>> {
    return this.directMessageClient.canDmFeed(dmCan, LMChatClient.dlClient);
  }

  // Method to get explore feed
  async getExploreFeed(
    exploreFeedData: ExploreFeedData
  ): Promise<LMResponse<ExploreFeedResponse>> {
    return this.exploreFeedClient.getExploreFeed(
      exploreFeedData,
      LMChatClient.dlClient
    );
  }

  // Method to get homefeed
  async getHomeFeed(
    homeFeed: GetHomeFeedRequest
  ): Promise<LMResponse<HomeFeedResponse>> {
    return this.homeFeedClient.getHomeFeed(homeFeed, LMChatClient.dlClient);
  }

  // Method to get invites
  async getInvites(invite: INVITE): Promise<LMResponse<GetInvitesResponse>> {
    return this.homeFeedClient.getInvites(invite, LMChatClient.dlClient);
  }

  // Method to send invites
  async sendInvites(participant: Participant): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.sendInvites(participant, LMChatClient.dlClient);
  }

  // Method to register a device
  async registerDevice(device: Device): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.registerDevice(device, LMChatClient.dlClient);
  }

  // Method for inviteAction
  async inviteAction(iaType: IaType): Promise<LMResponse<Nothing>> {
    return this.homeFeedClient.inviteAction(iaType, LMChatClient.dlClient);
  }

  // Method to initiate a firebase instance
  firebaseInstance() {
    return this.homeFeedClient.firebaseInstance(LMChatClient.dlClient);
  }

  // Method to post a poll conversation
  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest
  ): Promise<LMResponse<PostPollConversationResponse>> {
    return this.pollClient.postPollConversation(
      postPollConversationRequest,
      LMChatClient.dlClient
    );
  }

  // Method to get poll users
  async getPollUsers(
    getPollUsersRequest: GetPollUsersRequest
  ): Promise<LMResponse<GetPollUsersResponse>> {
    return this.pollClient.getPollUsers(
      getPollUsersRequest,
      LMChatClient.dlClient
    );
  }

  // Method to add poll option
  async addPollOption(
    addPollOptionRequest: AddPollOptionRequest
  ): Promise<LMResponse<AddPollResponse>> {
    return this.pollClient.addPollOption(
      addPollOptionRequest,
      LMChatClient.dlClient
    );
  }

  // Method to submit a poll
  async submitPoll(
    submitPollRequest: SubmitPollRequest
  ): Promise<LMResponse<Nothing>> {
    return this.pollClient.submitPoll(submitPollRequest, LMChatClient.dlClient);
  }

  // Method to search a chatroom
  async searchChatroom(
    searchType: SearchType
  ): Promise<LMResponse<SearchChatroomResponse>> {
    return this.searchClient.searchChatroom(searchType, LMChatClient.dlClient);
  }

  // Method to search a conversation
  async searchConversation(
    searchConversation: SearchConversation
  ): Promise<LMResponse<SearchConversationResponse>> {
    return this.searchClient.searchConversation(
      searchConversation,
      LMChatClient.dlClient
    );
  }

  // Method to add an user to a cohort
  addMemberToCohort(
    addMemberToCohort: AddMemberToCohort
  ): Promise<LMResponse<Nothing>> {
    return this.userClient.addMemberToCohort(
      addMemberToCohort,
      LMChatClient.dlClient
    );
  }

  // Method to logout an user
  async logout(logout: Logout): Promise<LMResponse<Nothing>> {
    return this.userClient.logout(logout, LMChatClient.dlClient);
  }

  // Method for an user to leave community
  async leaveCommunity(
    leaveCommunity: LeaveCommunity
  ): Promise<LMResponse<Nothing>> {
    return this.userClient.leaveCommunity(
      leaveCommunity,
      LMChatClient.dlClient
    );
  }

  // Method to edit profile of an user
  async editProfile(editProfile: EditProfile): Promise<LMResponse<Nothing>> {
    return this.userClient.editProfile(editProfile, LMChatClient.dlClient);
  }

  // Method to get member state of an user
  async getMemberState(): Promise<LMResponse<GetMemberStateResponse>> {
    return this.userClient.getMemberState(LMChatClient.dlClient);
  }

  // Method to search members
  async searchMembers(
    search: Search
  ): Promise<LMResponse<SearchMembersResponse>> {
    return this.userClient.searchMembers(search, LMChatClient.dlClient);
  }

  // Method to get all members
  async getAllMembers(
    getAllMembers: GetAllMembers
  ): Promise<LMResponse<GetAllMembersResponse>> {
    return this.userClient.getAllMembers(getAllMembers, LMChatClient.dlClient);
  }

  // Method to call syncChatroom API
  async syncChatroom(
    request: SyncChatroomRequest
  ): Promise<LMResponse<SyncChatroomResponse>> {
    return this.syncClient.syncChatroom(request, LMChatClient.dlClient);
  }

  // Method to call syncConversation API
  async syncConversation(
    request: SyncConversationRequest
  ): Promise<LMResponse<SyncConversationResponse>> {
    return this.syncClient.syncConversation(request, LMChatClient.dlClient);
  }

  // Method to get ExploreTabCount
  async getExploreTabCount(): Promise<LMResponse<GetExploreTabCountResponse>> {
    return this.homeFeedClient.getExploreTabCount(LMChatClient.dlClient);
  }

  // Method to save community
  async saveCommunity(communityData) {
    return saveCommunity(communityData);
  }

  // Method to save chatroom in localDB
  async saveChatroomResponse(
    data: SyncChatroomResponse,
    chatrooms: ChatroomModel[],
    communityId: string
  ) {
    return saveChatroomResponse(data, chatrooms, communityId);
  }

  // Method to get community from localDB
  async getCommunity() {
    return getCommunity();
  }

  // Method to get chatrooms from localDB
  async getChatrooms() {
    return getChatrooms();
  }

  // Method to update timestamp in localDB
  async updateTimeStamp(maxTimeStampNow: number, isDm: boolean) {
    return updateTimeStamp(maxTimeStampNow, isDm);
  }

  // Method to get timestamp from localDB
  async getTimeStamp() {
    return getTimeStamp();
  }

  // Method to initiate groupFeed and dmFeed minTimeStamp to 0
  async initiateTimeStamp() {
    return initiateTimeStamp();
  }

  // Method to update mute status from localDB
  async updateMuteStatus(chatroomId: string) {
    return updateMuteStatus(chatroomId);
  }

  // Method to update unseen count in localDB
  async updateUnseenCount(chatroomId: string) {
    return updateUnseenCount(chatroomId);
  }

  // Method to get instance
  getInstance() {
    return Db.getInstance();
  }

  // Method to save conversation in localDB
  async saveConversationData(
    data: SyncConversationResponse,
    chatroomData: ChatroomModel[],
    conversationData: ConversationModel[],
    communityId: string
  ) {
    return saveConversationData(
      data,
      chatroomData,
      conversationData,
      communityId
    );
  }

  // Method to update conversation in localDB
  async updateConversation(conversationId: string, data: ConversationModel) {
    return updateConversation(conversationId, data);
  }

  // Method to save new conversation in localDB
  async saveNewConversation(chatroomId: string, data: ConversationModel) {
    return saveNewConversation(chatroomId, data);
  }

  // Method to delete a conversation from localDB
  async deleteConversation(
    conversationId: string,
    user: Member,
    conversations: ConversationModel[],
    isChatroomTopic: boolean,
    chatroomId: string
  ) {
    return deleteConversation(
      conversationId,
      user,
      conversations,
      isChatroomTopic,
      chatroomId
    );
  }

  // Method to get a particular convesation from localDB
  async getConversation(conversationId: string) {
    return getConversation(conversationId);
  }

  // Method to update deletedBy from localDB
  async updateDeletedBy(conversationId: string, data: ConversationModel) {
    return updateDeletedBy(conversationId, data);
  }

  // Method to replace save conversation from localDB
  async replaceSavedConversation(data: ConversationModel) {
    return replaceSavedConversation(data);
  }

  // Method to save a conversation's attachment in localDB
  async saveAttachmentUploadConversation(key: string, value: string) {
    return saveAttachmentUploadConversation(key, value);
  }

  // Method to get all attachment from localDB
  async getAllAttachmentUploadConversations() {
    return getAllAttachmentUploadConversations();
  }

  // Method to remove attachment from localDB
  async removeAttactmentUploadConversationByKey(key: string) {
    return removeAttactmentUploadConversationByKey(key);
  }

  // Method to get filtered chatroom whether it belongs to DM feed or Group feed
  async getFilteredChatrooms(isDm: boolean) {
    return getFilteredChatrooms(isDm);
  }

  // Method to get chatroom details with v2 as accepted-version
  async getChatroomActions(
    chatroom: ChatroomRequest
  ): Promise<LMResponse<GetChatroomResponse>> {
    return this.chatroomClient.getChatroom(chatroom, LMChatClient.dlClient);
  }

  // Method to update chatRequestState of a chatroom in localDB
  async updateChatRequestState(chatroomId: string, chatRequestState: number) {
    return updateChatRequestState(chatroomId, chatRequestState);
  }

  // Method to update isChatroomViewed key
  async updateChatroomViewed(chatroomId: string) {
    return updateChatroomViewed(chatroomId);
  }

  // Method to toggle followStatus in localDB
  async updateChatroomFollowStatus(chatroomId: string, followStatus: boolean) {
    return updateChatroomFollowStatus(chatroomId, followStatus);
  }

  // Method to update poll votes in localDB
  async updatePollVotes(data: ConversationModel[], communityId: string) {
    return updatePollVotes(data, communityId);
  }

  // Method to setAppConfig
  async setAppConfig(isDm: boolean) {
    return setAppConfig(isDm);
  }

  // Method to getAppConfig
  async getAppConfig() {
    return getAppConfig();
  }

  // Method to initiateAppConfig
  async initiateAppConfig() {
    return initiateAppConfig();
  }

  // Method to get conversations
  async getConversations(getConversationsRequest: GetConversationsRequest) {
    return getConversations(getConversationsRequest);
  }
  // Method to delete conversations from realm
  async deleteConversationFromRealm(conversationId: string) {
    return deleteConversationFromRealm(conversationId);
  }

  // Method to get user schema
  async getUserSchema() {
    return getUserSchema();
  }

  // Method to set user schema
  async setUserSchema(userUniqueID: string, userName: string, apiKey:string) {
    return setUserSchema(userUniqueID, userName, apiKey);
  }
}

export {
  LMChatClient,
  SyncChatroomRequest,
  SyncConversationRequest,
  GetConversationsRequestBuilder,
  ConversationState,
  LMSDKCallbacks,
  InitUserWithUuid,
  ValidateUser,
};
