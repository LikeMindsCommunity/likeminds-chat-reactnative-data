import { environment } from "src/environment";

export const API = {
  CHATROOM_SYNC: `${environment.apiUrl}/chatroom/sync`, // (GET)
  CONVERSATION_SYNC: `${environment.apiUrl}/conversation/sync`, // (GET)
  GET_EXPLORE_TAB_COUNT: `${environment.apiUrl}/community/member/home/meta`, // (GET)
  CHATROOM: `${environment.apiUrl}/chatroom`, // (GET)
  GET_UNREAD_CONVERSATION_NOTIFICATION: `${environment.apiUrl}/conversation/notification/unread`, // (GET)
  PUT_MEMBER_TO_COHORT: `${environment.apiUrl}/community/cohort`, // (PUT)
  SDK_INITIATE: `/sdk/initiate`,
  REFRESH_TOKEN_API: `/user/refresh`,
};
