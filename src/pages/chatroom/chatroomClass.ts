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
  CHTYPE,
  CmetaType,
  CRSeen,
  ChatroomSeen,
} from "@likeminds.community/chat-js/dist/pages/chatroom/types";
import LMResponse from "../../core/services/lmresponse";
import { ChatroomResponse } from "../../shared/responseModels/Chatroom";
import { ShareChatroomUrlResponse } from "./responseModels/ShareChatroomUrlResponse";
import { GetTaggingListResponse } from "./responseModels/GetTaggingListResponse";
import { GetConversationsResponse } from "./responseModels/GetConversationsResponse";
import { PutMultimediaResponse } from "./responseModels/PutMultimediaResponse";
import { DecodeUrlResponse } from "./responseModels/DecodeUrlResponse";
import { ProfileDataResponse } from "./responseModels/ProfileDataResponse";
import { ModelConverter } from "src/utils/ModelConverter";
import DLClient from "@likeminds.community/chat-js";
import { Success } from "src/shared/responseModels/Success";
import { PostConversationsResponse } from "./responseModels/PostConversationResponse";
import { EditConversationResponse } from "./responseModels/EditConversationResponse";
import { DeleteConversationsResponse } from "./responseModels/DeleteConversationsResponse";
import { GetReportTagsResponse } from "./responseModels/GetReportTagsResponse";
import { FetchConversationResponse } from "./responseModels/FetchConversationResponse";

class ChatroomClass {
  private static dlClient: DLClient;

  // public static build(dlClient: DLClient): ChatroomClass {
  //   this.dlClient = dlClient;
  //   const chatroomClass = new ChatroomClass();
  //   return chatroomClass;
  // }

  async muteChatroom(muteChatroom: MuteChatroom): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(muteChatroom);
      const resp = await ChatroomClass.dlClient.muteChatroom(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true); //(data,errorMsg,success)
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occurred",
        false
      );
    }
  }

  async followChatroom(
    followChatroom: FollowChatroom
  ): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(followChatroom);
      const resp = await ChatroomClass.dlClient.followChatroom(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true); //(data,errorMsg,success)
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occurred",
        false
      );
    }
  }

  async getChatroom(chatroom: Chatroom): Promise<LMResponse<ChatroomResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(chatroom);
      const resp = await ChatroomClass.dlClient.getChatroom(params);
      const convertedResp: ChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ChatroomResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ChatroomResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async markReadChatroom(markRead: MarkRead): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(markRead);
      const resp = await ChatroomClass.dlClient.markReadChatroom(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async shareChatroomUrl(
    shareChatroom: ShareChatroom
  ): Promise<LMResponse<ShareChatroomUrlResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(shareChatroom);
      const resp = await ChatroomClass.dlClient.shareChatroomUrl(params);
      const convertedResp: ShareChatroomUrlResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ShareChatroomUrlResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<ShareChatroomUrlResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async setChatroomTopic(
    setChatroom: SetChatroom
  ): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(setChatroom);
      const resp = await ChatroomClass.dlClient.setChatroomTopic(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getTaggingList(
    taggingList: TaggingList
  ): Promise<LMResponse<GetTaggingListResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(taggingList);
      const resp = await ChatroomClass.dlClient.setChatroomTopic(params);
      const convertedResp: GetTaggingListResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetTaggingListResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetTaggingListResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getConversation(
    conversation: Conversation
  ): Promise<LMResponse<GetConversationsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(conversation);
      const resp = await ChatroomClass.dlClient.getConversation(params);
      const convertedResp: GetConversationsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetConversationsResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<GetConversationsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async postConversation(
    postConversation: PostConversation
  ): Promise<LMResponse<PostConversationsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(postConversation);
      const resp = await ChatroomClass.dlClient.postConversation(params);
      const convertedResp: PostConversationsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PostConversationsResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<PostConversationsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editConversation(
    conversationId: EditConversation
  ): Promise<LMResponse<EditConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(conversationId);
      const resp = await ChatroomClass.dlClient.editConversation(params);
      const convertedResp: EditConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<EditConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<EditConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async deleteConversation(
    deleteConversation: DeleteConversation
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(deleteConversation);
      const resp = await ChatroomClass.dlClient.deleteConversation(params);
      const convertedResp: DeleteConversationsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DeleteConversationsResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<DeleteConversationsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async putReaction(putReaction: PutReaction): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(putReaction);
      const resp = await ChatroomClass.dlClient.putReaction(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async deleteReaction(
    deleteReaction: DeleteReaction
  ): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(deleteReaction);
      const resp = await ChatroomClass.dlClient.deleteReaction(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
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
  ): Promise<LMResponse<GetReportTagsResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(getReportTags);
      const resp = await ChatroomClass.dlClient.getReportTags(params);
      const convertedResp: GetReportTagsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetReportTagsResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetReportTagsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async pushReport(pushReport: PushReport): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(pushReport);
      const resp = await ChatroomClass.dlClient.pushReport(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom
  ): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(leaveSecretChatroom);
      const resp = await ChatroomClass.dlClient.leaveSecretChatroom(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
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
  ): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(participantsType);
      const resp = await ChatroomClass.dlClient.viewParticipants(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async conversationsFetch(
    cmetaType: CmetaType
  ): Promise<LMResponse<FetchConversationResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(cmetaType);
      const resp = await ChatroomClass.dlClient.conversationsFetch(params);
      const convertedResp: FetchConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<FetchConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<FetchConversationResponse>(
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

  async crSeenFn(crSeen: CRSeen): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(crSeen);
      const resp = await ChatroomClass.dlClient.crSeenFn(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async chatroomSeen(chatroomSeen: ChatroomSeen): Promise<LMResponse<Success>> {
    try {
      const params = ModelConverter.requestBodyGenerator(chatroomSeen);
      const resp = await ChatroomClass.dlClient.chatroomSeen(params);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { ChatroomClass as default };
