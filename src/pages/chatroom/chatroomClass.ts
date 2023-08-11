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
  async muteChatroom(
    muteChatroom: MuteChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      const resp = await dlClient.muteChatroom(muteChatroom);
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
    followChatroom: FollowChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      const resp = await dlClient.followChatroom(followChatroom);
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

  async getChatroom(
    chatroom: Chatroom,
    dlClient: DLClient
  ): Promise<LMResponse<ChatroomResponse>> {
    try {
      const resp = await dlClient.getChatroom(chatroom);
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

  async markReadChatroom(
    markRead: MarkRead,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      const resp = await dlClient.markReadChatroom(markRead);
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
    shareChatroom: ShareChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<ShareChatroomUrlResponse>> {
    try {
      const resp = await dlClient.shareChatroomUrl(shareChatroom);
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
    setChatroom: SetChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      const resp = await dlClient.setChatroomTopic(setChatroom);
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
    taggingList: TaggingList,
    dlClient: DLClient
  ): Promise<LMResponse<GetTaggingListResponse>> {
    try {
      const resp = await dlClient.getTaggingList(taggingList);
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
    conversation: Conversation,
    dlClient: DLClient
  ): Promise<LMResponse<GetConversationsResponse>> {
    try {
      const resp = await dlClient.getConversation(conversation);
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
    postConversation: PostConversation,
    dlClient: DLClient
  ): Promise<LMResponse<PostConversationsResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(postConversation);
      const resp = await dlClient.postConversation(postConversation);
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
    conversationId: EditConversation,
    dlClient: DLClient
  ): Promise<LMResponse<EditConversationResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(conversationId);
      const resp = await dlClient.editConversation(conversationId);
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
    deleteConversation: DeleteConversation,
    dlClient: DLClient
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(deleteConversation);
      const resp = await dlClient.deleteConversation(deleteConversation);
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

  async putReaction(
    putReaction: PutReaction,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(putReaction);
      const resp = await dlClient.putReaction(putReaction);
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
    deleteReaction: DeleteReaction,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(deleteReaction);
      const resp = await dlClient.deleteReaction(deleteReaction);
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
    putMultimedia: PutMultimedia,
    dlClient: DLClient
  ): Promise<LMResponse<PutMultimediaResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(putMultimedia);
      const resp = await dlClient.putMultimedia(putMultimedia);
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
    decodeUrl: DecodeUrl,
    dlClient: DLClient
  ): Promise<LMResponse<DecodeUrlResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(decodeUrl);
      const resp = await dlClient.decodeUrl(decodeUrl);
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
    getReportTags: GetReportTags,
    dlClient: DLClient
  ): Promise<LMResponse<GetReportTagsResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(getReportTags);
      const resp = await dlClient.getReportTags(getReportTags);
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

  async pushReport(
    pushReport: PushReport,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(pushReport);
      const resp = await dlClient.pushReport(pushReport);
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
    leaveSecretChatroom: LeaveSecretChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(leaveSecretChatroom);
      const resp = await dlClient.leaveSecretChatroom(leaveSecretChatroom);
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
    profile: Profile,
    dlClient: DLClient
  ): Promise<LMResponse<ProfileDataResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(profile);
      const resp = await dlClient.profileData(profile);
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
    participantsType: ParticipantsType,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(participantsType);
      const resp = await dlClient.viewParticipants(participantsType);
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
    cmetaType: CmetaType,
    dlClient: DLClient
  ): Promise<LMResponse<FetchConversationResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(cmetaType);
      const resp = await dlClient.conversationsFetch(cmetaType);
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
  async fetchChatroomHome(
    chatroom: CHTYPE,
    dlClient: DLClient
  ): Promise<LMResponse<any>> {
    try {
      const resp = await dlClient.fetchChatroomHome(chatroom);
      const convertedResp = ModelConverter.responseBodyParser(resp);
      return new LMResponse<any>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<any>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async crSeenFn(
    crSeen: CRSeen,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(crSeen);
      const resp = await dlClient.crSeenFn(crSeen);
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

  async chatroomSeen(
    chatroomSeen: ChatroomSeen,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(chatroomSeen);
      const resp = await dlClient.chatroomSeen(chatroomSeen);
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
