import {
  FollowChatroom,
  MuteChatroom,
  MarkRead,
  Chatroom,
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
} from "./requestModels/requestModels";
import { MuteChatroomResponse } from "./responseModels/MuteChatroomRespModel";
import LMResponse from "../../core/services/lmresponse";
import { FollowChatroomResponse } from "./responseModels/FollowChatroomRespModel";
import { ChatroomRespModel } from "./responseModels/ChatroomRespModel";
import { ShareDataResponse } from "./responseModels/ShareChatroomRespModel";
import { MarkReadChatroomResponse } from "./responseModels/MarkReadChatroomRespModel";
import { SetChatroomTopicResponse } from "./responseModels/SetChatroomTopicRespModel";
import { TaggingListResponse } from "./responseModels/TaggingListRespModel";
import { GetConversationResponse } from "./responseModels/GetConversationRespModel";
import { PutReactionResponse } from "./responseModels/PutReactionRespModel";
import { PutMultimediaResponse } from "./responseModels/PutMultimediaRespModel";
import { DecodeUrlResponse } from "./responseModels/DecodeUrlRespModel";
import { ReportTagResponse } from "./responseModels/ReportTagRespModel";
import { PushReportResponse } from "./responseModels/PushReportRespModel";
import { ChatroomParticipantsResponse } from "./responseModels/ChatroomParticipantsRespModel";
import { ProfileDataResponse } from "./responseModels/ProfileDataRespModel";
import { CRSeenResponse } from "./responseModels/CRSeenRespModel";
import { ModelConverter } from "src/utils/ModelConverter";
import DLClient from "@likeminds.community/chat-js";

class ChatroomClass {
  private static dlClient: DLClient;

  // public static build(dlClient: DLClient): ChatroomClass {
  //   this.dlClient = dlClient;
  //   const chatroomClass = new ChatroomClass();
  //   return chatroomClass;
  // }

  async muteChatroom(
    muteChatroom: MuteChatroom
  ): Promise<LMResponse<MuteChatroomResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(muteChatroom);
      const resp = await ChatroomClass.dlClient.muteChatroom(params);
      const convertedResp: MuteChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<MuteChatroomResponse>(convertedResp, null, true); //(data,errorMsg,success)
    } catch (error) {
      return new LMResponse<MuteChatroomResponse>(
        null,
        error.message || "An error occurred",
        false
      );
    }
  }

  async followChatroom(
    followChatroom: FollowChatroom
  ): Promise<LMResponse<FollowChatroomResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(followChatroom);
      const resp = await ChatroomClass.dlClient.followChatroom(params);
      const convertedResp: FollowChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<FollowChatroomResponse>(convertedResp, null, true); //(data,errorMsg,success)
    } catch (error) {
      return new LMResponse<FollowChatroomResponse>(
        null,
        error.message || "An error occurred",
        false
      );
    }
  }

  async getChatroom(
    chatroom: Chatroom
  ): Promise<LMResponse<ChatroomRespModel>> {
    try {
      const params = ModelConverter.requestBodyGenerator(chatroom);
      const resp = await ChatroomClass.dlClient.getChatroom(params);
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
      const resp = await ChatroomClass.dlClient.markReadChatroom(params);
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
      const resp = await ChatroomClass.dlClient.shareChatroomUrl(params);
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
      const resp = await ChatroomClass.dlClient.setChatroomTopic(params);
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
      const resp = await ChatroomClass.dlClient.setChatroomTopic(params);
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
      const resp = await ChatroomClass.dlClient.getConversation(params);
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
      const resp = await ChatroomClass.dlClient.postConversation(params);
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
      const resp = await ChatroomClass.dlClient.editConversation(params);
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
      const resp = await ChatroomClass.dlClient.deleteConversation(params);
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
      const resp = await ChatroomClass.dlClient.putReaction(params);
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
      const resp = await ChatroomClass.dlClient.deleteReaction(params);
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
      const resp = await ChatroomClass.dlClient.putMultimedia(params);
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
      const resp = await ChatroomClass.dlClient.decodeUrl(params);
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
      const resp = await ChatroomClass.dlClient.getReportTags(params);
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
      const resp = await ChatroomClass.dlClient.pushReport(params);
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
      const resp = await ChatroomClass.dlClient.leaveSecretChatroom(params);
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
      const resp = await ChatroomClass.dlClient.profileData(params);
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
      const resp = await ChatroomClass.dlClient.viewParticipants(params);
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
      const resp = await ChatroomClass.dlClient.conversationsFetch(params);
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
  //     const resp = await ChatroomClass.dlClient.conversationsFetch(params);
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
      const resp = await ChatroomClass.dlClient.crSeenFn(params);
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
      const resp = await ChatroomClass.dlClient.chatroomSeen(params);
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
}

export { ChatroomClass as default };
