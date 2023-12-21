import {
  MuteChatroom,
  MarkRead,
  Chatroom as ChatroomRequest,
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
  ChatroomSeenWithUuid,
  FollowChatroomWithUuid,
} from "@likeminds.community/chat-js/dist/pages/chatroom/types";
import { Conversation as ConversationModel } from "src/shared/responseModels/Conversation";
import LMResponse from "../../core/services/lmresponse";
import { ShareChatroomUrlResponse } from "./responseModels/ShareChatroomUrlResponse";
import { GetTaggingListResponse } from "./responseModels/GetTaggingListResponse";
import { GetConversationsResponse } from "./responseModels/GetConversationsResponse";
import { PutMultimediaResponse } from "./responseModels/PutMultimediaResponse";
import { DecodeUrlResponse } from "./responseModels/DecodeUrlResponse";
import { ModelConverter } from "src/utils/ModelConverter";
import DLClient from "@likeminds.community/chat-js";
import { Nothing } from "src/shared/responseModels/Nothing";
import { PostConversationsResponse } from "./responseModels/PostConversationResponse";
import { EditConversationResponse } from "./responseModels/EditConversationResponse";
import { DeleteConversationsResponse } from "./responseModels/DeleteConversationsResponse";
import { GetReportTagsResponse } from "./responseModels/GetReportTagsResponse";
import { FetchConversationResponse } from "./responseModels/FetchConversationResponse";
import { API } from "src/shared/constants/api.constant";
import { GetChatroomResponse } from "./responseModels/GetChatroomResponse";
import { updateChatroomTopic } from "src/localDb/db/queries/chatroom";
import { GetConversationNotificationUnreadResponse } from "./responseModels/GetConversationNotificationUnreadResponse";

class ChatroomClient {
  async muteChatroom(
    muteChatroom: MuteChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.muteChatroom(muteChatroom);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occurred",
        false
      );
    }
  }

  async followChatroom(
    followChatroom: FollowChatroomWithUuid,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    return await dlClient.followChatroomWithUuid(followChatroom);
  }

  async getChatroom(
    chatroom: ChatroomRequest,
    dlClient: DLClient
  ): Promise<LMResponse<GetChatroomResponse>> {
    return dlClient
      .makeAuthenticatedRequest(
        `${API.CHATROOM}?chatroom_id=${chatroom.chatroomId}`,
        {
          headers: {
            "x-accept-version": "v2",
          },
        }
      )
      .then((response) => {
        // Handle the response and return the LMResponse object
        const responseData: GetChatroomResponse =
          ModelConverter.responseBodyParser(response);

        return new LMResponse<GetChatroomResponse>(responseData, null, true);
      })
      .catch((error) => {
        return new LMResponse<GetChatroomResponse>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }

  async markReadChatroom(
    markRead: MarkRead,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.markReadChatroom(markRead);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
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
    dlClient: DLClient,
    conversation: ConversationModel
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.setChatroomTopic(setChatroom);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      // updating local db as well
      await updateChatroomTopic(
        setChatroom?.chatroomId?.toString(),
        conversation
      );
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
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

  async getConversations(
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
    editConversation: EditConversation,
    dlClient: DLClient,
    conversation?: ConversationModel
  ): Promise<LMResponse<EditConversationResponse>> {
    try {
      const response = await dlClient.editConversation(editConversation);
      const convertedResponse = ModelConverter.responseBodyParser(response);

      // updating chatroom topic in local db as well
      if (editConversation.conversationId == conversation?.id) {
        await updateChatroomTopic(
          conversation?.chatroomId?.toString(),
          convertedResponse?.conversation
        );
      }
      return new LMResponse<EditConversationResponse>(
        convertedResponse,
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

  async deleteConversations(
    deleteConversation: DeleteConversation,
    dlClient: DLClient
  ): Promise<LMResponse<DeleteConversationsResponse>> {
    try {
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
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.putReaction(putReaction);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async deleteReaction(
    deleteReaction: DeleteReaction,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.deleteReaction(deleteReaction);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
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

  async postReport(
    postReport: PushReport,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.pushReport(postReport);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async leaveSecretChatroom(
    leaveSecretChatroom: LeaveSecretChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.leaveSecretChatroom(leaveSecretChatroom);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getParticipants(
    participantsType: ParticipantsType,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.viewParticipants(participantsType);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getConversationMeta(
    cmetaType: CmetaType,
    dlClient: DLClient
  ): Promise<LMResponse<FetchConversationResponse>> {
    try {
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

  async chatroomSeen(
    chatroomSeen: ChatroomSeenWithUuid,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    return await dlClient.chatroomSeenWithUuid(chatroomSeen);
  }

  async getUnreadConversationNotification(
    dlClient: DLClient
  ): Promise<LMResponse<GetConversationNotificationUnreadResponse>> {
    return dlClient
      .makeAuthenticatedRequest(`${API.GET_UNREAD_CONVERSATION_NOTIFICATION}`)
      .then((resData) => {
        // Handle the response and return the LMResponse object
        const responseData: GetConversationNotificationUnreadResponse =
          ModelConverter.responseBodyParser(resData);

        return new LMResponse<GetConversationNotificationUnreadResponse>(
          responseData,
          null,
          true
        );
      })
      .catch((error) => {
        return new LMResponse<GetConversationNotificationUnreadResponse>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }
}

export { ChatroomClient as default };
