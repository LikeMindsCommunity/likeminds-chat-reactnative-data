import DLClient from "@likeminds.community/chat-js";

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
} from "@likeminds.community/chat-js/dist/pages/chatroom/types";
import LMResponse from "../src/core/services/lmresponse";
import { ChatroomResponse } from "./shared/responseModels/Chatroom";
import { ShareChatroomUrlResponse } from "./pages/chatroom/responseModels/ShareChatroomUrlResponse";
import { GetTaggingListResponse } from "./pages/chatroom/responseModels/GetTaggingListResponse";
import { GetConversationsResponse } from "./pages/chatroom/responseModels/GetConversationsResponse";
import { PutMultimediaResponse } from "./pages/chatroom/responseModels/PutMultimediaResponse";
import { DecodeUrlResponse } from "./pages/chatroom/responseModels/DecodeUrlResponse";
import { ProfileDataResponse } from "./pages/chatroom/responseModels/ProfileDataResponse";
import { Success } from "./shared/responseModels/Success";
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
} from "@likeminds.community/chat-js/dist/pages/direct-message/types";
import { DMStatusResponse } from "./pages/directMessage/responseModels/DMStatusResponse";
import { DMLimitResponse } from "./pages/directMessage/responseModels/DMLimitResponse";
import { SendDMRequestResponse } from "./pages/directMessage/responseModels/SendDMRequestResponse";
import { CheckDMTabResponse } from "./pages/directMessage/responseModels/CheckDMTabResponse";
import DirectMessage from "./pages/directMessage/directMessageClass";
import { CreateDMChatroomResponse } from "./pages/directMessage/responseModels/CreateDMChatroomResponse";
import { FetchDMResponse } from "./pages/directMessage/responseModels/FetchDMResponse";
import { BlockDMRequestResponse } from "./pages/directMessage/responseModels/BlockDMRequestResponse";
import { GetDMFeedResponse } from "./pages/directMessage/responseModels/GetDMFeedResponse";
import { CanDMFeedResponse } from "./pages/directMessage/responseModels/CanDMFeedResponse";

//Explore Feed
import { ExploreFeedData } from "@likeminds.community/chat-js/dist/pages/explore-feed/types";
import { ExploreFeedResponse } from "./pages/exploreFeed/responseModels/ExploreFeedResponse";
import ExploreFeed from "./pages/exploreFeed/exploreFeedClass";

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
import HomeFeedClass from "./pages/homeFeed/homeFeedClass";
import { GetInvitesResponse } from "./pages/homeFeed/responseModels/GetInvitesResponse";

//POLL
import {
  PostPollConversationRequest,
  GetPollUsersRequest,
  AddPollOptionRequest,
  SubmitPollRequest,
} from "@likeminds.community/chat-js/dist/pages/poll/types";
import { PostPollConversationResponse } from "./pages/poll/responseModels/PostPollConversationResponse";
import { GetPollUsersResponse } from "./pages/poll/responseModels/GetPollUserResponse";
import { AddPollResponse } from "./pages/poll/responseModels/AddPollResponse";
import PollClass from "./pages/poll/pollClass";

//Search
import {
  SearchType,
  SearchConversation,
} from "@likeminds.community/chat-js/dist/pages/search/types";
import { SearchChatroomResponse } from "./pages/search/responseModels/SearchChatroomResponse";
import { SearchConversationResponse } from "./pages/search/responseModels/SearchConversationResponse";
import SearchClass from "./pages/search/searchClass";

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
} from "@likeminds.community/chat-js/dist/pages/user/types";
import { InitiateUserResponse } from "./pages/user/responseModels/InitUserResponse";
import { GetProfileResponse } from "./pages/user/responseModels/GetProfileResponse";
import { GetMemberResponse } from "./pages/user/responseModels/GetMemberChatroomResponse";
import { GetQuestionsResponse } from "./pages/user/responseModels/GetQuestionsResponse";
import { GetMemberStateResponse } from "./pages/user/responseModels/GetMemberStateResponse";
import { SearchMembersResponse } from "./pages/user/responseModels/SearchMembersResponse";
import { GetAllMembersResponse } from "./pages/user/responseModels/GetAllMemberResponse";
import UserClass from "./pages/user/userClass";

//DB
import { db } from "./utils/firebase";
import { onValue, ref } from "firebase/database";

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
  directMessageClient = new DirectMessage();
  exploreFeedClient = new ExploreFeed();
  homeFeedClient = new HomeFeedClass();
  pollClient = new PollClass();
  searchClient = new SearchClass();
  userClient = new UserClass();

  async muteChatroom(muteChatroom: MuteChatroom): Promise<LMResponse<Success>> {
    return this.chatroomClient.muteChatroom(muteChatroom);
  }

  async followChatroom(
    followChatroom: FollowChatroom
  ): Promise<LMResponse<Success>> {
    return this.chatroomClient.followChatroom(followChatroom);
  }

  async getChatroom(chatroom: Chatroom): Promise<LMResponse<ChatroomResponse>> {
    return this.chatroomClient.getChatroom(chatroom);
  }

  async markReadChatroom(markRead: MarkRead): Promise<LMResponse<Success>> {
    return this.chatroomClient.markReadChatroom(markRead);
  }

  async shareChatroomUrl(
    shareChatroom: ShareChatroom
  ): Promise<LMResponse<ShareChatroomUrlResponse>> {
    return this.chatroomClient.shareChatroomUrl(shareChatroom);
  }

  async setChatroomTopic(
    setChatroom: SetChatroom
  ): Promise<LMResponse<Success>> {
    return this.chatroomClient.setChatroomTopic(setChatroom);
  }

  async getTaggingList(
    taggingList: TaggingList
  ): Promise<LMResponse<GetTaggingListResponse>> {
    return this.chatroomClient.getTaggingList(taggingList);
  }

  async getConversation(
    conversation: Conversation
  ): Promise<LMResponse<GetConversationsResponse>> {
    return this.chatroomClient.getConversation(conversation);
  }

  async postConversation(
    postConversation: PostConversation
  ): Promise<LMResponse<PostConversationsResponse>> {
    return this.chatroomClient.postConversation(postConversation);
  }

  async editConversation(
    conversationId: EditConversation
  ): Promise<LMResponse<EditConversationResponse>> {
    return this.chatroomClient.editConversation(conversationId);
  }

  async deleteConversation(
    deleteConversation: DeleteConversation
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    return this.chatroomClient.deleteConversation(deleteConversation);
  }

  async putReaction(putReaction: PutReaction): Promise<LMResponse<Success>> {
    return this.chatroomClient.putReaction(putReaction);
  }

  async deleteReaction(
    deleteReaction: DeleteReaction
  ): Promise<LMResponse<Success>> {
    return this.chatroomClient.deleteReaction(deleteReaction);
  }

  async putMultimedia(
    putMultimedia: PutMultimedia
  ): Promise<LMResponse<PutMultimediaResponse>> {
    return this.chatroomClient.putMultimedia(putMultimedia);
  }

  async decodeUrl(
    decodeUrl: DecodeUrl
  ): Promise<LMResponse<DecodeUrlResponse>> {
    return this.chatroomClient.decodeUrl(decodeUrl);
  }

  async getReportTags(
    getReportTags: GetReportTags
  ): Promise<LMResponse<GetReportTagsResponse>> {
    return this.chatroomClient.getReportTags(getReportTags);
  }

  async pushReport(pushReport: PushReport): Promise<LMResponse<Success>> {
    return this.chatroomClient.pushReport(pushReport);
  }

  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom
  ): Promise<LMResponse<Success>> {
    return this.chatroomClient.leaveSecretChatroom(leaveSecretChatroom);
  }

  async profileData(
    profile: Profile
  ): Promise<LMResponse<ProfileDataResponse>> {
    return this.chatroomClient.profileData(profile);
  }

  async viewParticipants(
    participantsType: ParticipantsType
  ): Promise<LMResponse<Success>> {
    return this.chatroomClient.viewParticipants(participantsType);
  }

  async conversationsFetch(
    cmetaType: CmetaType
  ): Promise<LMResponse<FetchConversationResponse>> {
    return this.chatroomClient.conversationsFetch(cmetaType);
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

  async crSeenFn(crSeen: CRSeen): Promise<LMResponse<Success>> {
    return this.chatroomClient.crSeenFn(crSeen);
  }

  async chatroomSeen(chatroomSeen: ChatroomSeen): Promise<LMResponse<Success>> {
    return this.chatroomClient.chatroomSeen(chatroomSeen);
  }

  //DIRECT MESSAGE

  async fetchDMFeed(
    fetchDMFeed: FetchDMFeed
  ): Promise<LMResponse<FetchDMResponse>> {
    return this.directMessageClient.fetchDMFeed(fetchDMFeed);
  }

  async checkDMStatus(
    checkDMStatus: CheckDMStatus
  ): Promise<LMResponse<DMStatusResponse>> {
    return this.directMessageClient.checkDMStatus(checkDMStatus);
  }

  async checkDMLimit(
    checkDMLimit: CheckDMLimit
  ): Promise<LMResponse<DMLimitResponse>> {
    return this.directMessageClient.checkDMLimit(checkDMLimit);
  }

  async createDMChatroom(
    createDMChatroom: CreateDMChatroom
  ): Promise<LMResponse<CreateDMChatroomResponse>> {
    return this.directMessageClient.createDMChatroom(createDMChatroom);
  }

  async sendDMRequest(
    sendDMRequest: SendDMRequest
  ): Promise<LMResponse<SendDMRequestResponse>> {
    return this.directMessageClient.sendDMRequest(sendDMRequest);
  }

  async blockMember(
    blockMember: BlockMember
  ): Promise<LMResponse<BlockDMRequestResponse>> {
    return this.directMessageClient.blockMember(blockMember);
  }

  async checkDMTab(): Promise<LMResponse<CheckDMTabResponse>> {
    return this.directMessageClient.checkDMTab();
  }

  async getDMFeed(cid: CID): Promise<LMResponse<GetDMFeedResponse>> {
    return this.directMessageClient.getDMFeed(cid);
  }

  async canDmFeed(dmCan: CANDM): Promise<LMResponse<CanDMFeedResponse>> {
    return this.directMessageClient.canDmFeed(dmCan);
  }

  //EXPLORE FEED
  async getExploreFeed(
    exploreFeedData: ExploreFeedData
  ): Promise<LMResponse<ExploreFeedResponse>> {
    return this.exploreFeedClient.getExploreFeed(exploreFeedData);
  }

  //HomeFeed
  async getHomeFeed(homeFeed: HomeFeed): Promise<LMResponse<HomeFeedResponse>> {
    return this.homeFeedClient.getHomeFeed(homeFeed);
  }

  async getInvites(invite: INVITE): Promise<LMResponse<GetInvitesResponse>> {
    return this.homeFeedClient.getInvites(invite);
  }

  async sendInvites(participant: Participant): Promise<LMResponse<Success>> {
    return this.homeFeedClient.sendInvites(participant);
  }

  async registerDevice(device: Device): Promise<LMResponse<Success>> {
    return this.homeFeedClient.registerDevice(device);
  }

  async inviteAction(iaType: IaType): Promise<LMResponse<Success>> {
    return this.homeFeedClient.inviteAction(iaType);
  }

  fbInstance() {
    return this.homeFeedClient.fbInstance();
  }

  homeFeedListener(callback: any, route: any) {
    return this.homeFeedClient.homeFeedListener(callback, route);
  }

  // homeFeedListener(callback: any, route: any) {
  //   const query = ref(db, route);
  //   return onValue(query, (snapshot) => {
  //     if (snapshot.exists()) {
  //       callback(snapshot.val());
  //     }
  //   });
  // }

  //POLL

  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest
  ): Promise<LMResponse<PostPollConversationResponse>> {
    return this.pollClient.postPollConversation(postPollConversationRequest);
  }

  async getPollUsers(
    getPollUsersRequest: GetPollUsersRequest
  ): Promise<LMResponse<GetPollUsersResponse>> {
    return this.pollClient.getPollUsers(getPollUsersRequest);
  }

  async addPollOption(
    addPollOptionRequest: AddPollOptionRequest
  ): Promise<LMResponse<AddPollResponse>> {
    return this.pollClient.addPollOption(addPollOptionRequest);
  }

  async submitPoll(
    submitPollRequest: SubmitPollRequest
  ): Promise<LMResponse<Success>> {
    return this.pollClient.submitPoll(submitPollRequest);
  }

  //Search

  async searchChatroom(
    searchType: SearchType
  ): Promise<LMResponse<SearchChatroomResponse>> {
    return this.searchClient.searchChatroom(searchType);
  }

  async searchConversation(
    searchConversation: SearchConversation
  ): Promise<LMResponse<SearchConversationResponse>> {
    return this.searchClient.searchConversation(searchConversation);
  }

  //User
  initiateUser(initUser: InitUser): Promise<LMResponse<InitiateUserResponse>> {
    return this.userClient.initiateUser(initUser);
  }

  async logout(logout: Logout): Promise<LMResponse<Success>> {
    return this.userClient.logout(logout);
  }

  async getProfile(
    getProfile: GetProfile
  ): Promise<LMResponse<GetProfileResponse>> {
    return this.userClient.getProfile(getProfile);
  }

  async getMemberChatroom(
    getMemberChatroom: GetMemberChatroom
  ): Promise<LMResponse<GetMemberResponse>> {
    return this.userClient.getMemberChatroom(getMemberChatroom);
  }

  async getQuestions(): Promise<LMResponse<GetQuestionsResponse>> {
    return this.userClient.getQuestions();
  }

  async getMemberState(): Promise<LMResponse<GetMemberStateResponse>> {
    return this.userClient.getMemberState();
  }

  async editProfile(editProfile: EditProfile): Promise<LMResponse<Success>> {
    return this.userClient.editProfile(editProfile);
  }

  async searchMembers(
    search: Search
  ): Promise<LMResponse<SearchMembersResponse>> {
    return this.userClient.searchMembers(search);
  }

  async getAllMembers(
    getAllMembers: GetAllMembers
  ): Promise<LMResponse<GetAllMembersResponse>> {
    return this.userClient.getAllMembers(getAllMembers);
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
