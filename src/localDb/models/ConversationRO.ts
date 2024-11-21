import {
  BOOLEAN,
  CHATROOM_RO,
  COMMUNITY_RO,
  CONVERSATIONS,
  CONVERSATION_RO,
  ID,
  INT,
  LINKING_OBJECTS,
  LIST_ATTACHMENT_RO,
  LIST_POLL_RO,
  LIST_REACTION_RO,
  OPTIONAL_BOOLEAN,
  OPTIONAL_INT,
  OPTIONAL_LINK_OG_TAGS_RO,
  OPTIONAL_MEMBER_RO,
  OPTIONAL_REPLY_CONVERSATION_RO,
  OPTIONAL_STRING,
  OPTIONAL_WIDGET_RO,
  STRING,
} from "../constants";
import { AttachmentRO } from "./AttachmentRO";
import { ChatroomRO } from "./ChatroomRO";
import { CommunityRO } from "./CommunityRO";
import { LinkOGTagsRO } from "./LinkOGTagsRO";
import { MemberRO } from "./MemberRO";
import { PollRO } from "./PollRO";
import { ReactionRO } from "./ReactionRO";
import Realm from "realm";
import { WidgetRO } from "./WidgetRO";

export class ConversationRO extends Realm.Object<ConversationRO> {
  id!: string;
  chatroomId!: string;
  communityId!: string;
  cardId?: string;
  member?: MemberRO | null;
  ogTags?: LinkOGTagsRO | null;
  answer!: string;
  state!: number;
  createdEpoch!: number;
  createdAt?: string | null;
  attachments!: Realm.List<AttachmentRO>;
  date?: string | null;
  isEdited?: boolean | null;
  lastSeen!: boolean;
  replyConversation?: string;
  replyConversationId?: string | null;
  replyConversationObject?: ConversationRO | null;
  deletedBy?: string | null;
  attachmentCount?: number | null;
  userId?: string;
  attachmentsUploaded?: boolean | null;
  uploadWorkerUUID?: string | null;
  localSavedEpoch!: number;
  temporaryId?: string | null;
  reactions!: Realm.List<ReactionRO>;
  isAnonymous?: boolean | null;
  allowAddOption?: boolean | null;
  pollType?: number | null;
  pollTypeText?: string | null;
  submitTypeText?: string | null;
  expiryTime?: number | null;
  multipleSelectNo?: number | null;
  multipleSelectState?: number | null;
  polls!: Realm.List<PollRO>;
  pollAnswerText?: string | null;
  toShowResults?: boolean | null;
  replyChatRoomId?: string | null;
  replyId?: string | null;
  isInProgress?: string | null;
  hasFiles?: boolean | null;
  lastUpdatedAt!: number;
  deletedByMember?: MemberRO | null;
  deletedByUserId?: string | null;
  community?: Realm.Results<CommunityRO> | null;
  chatroom?: Realm.Results<ChatroomRO> | null;
  widgetId: string;
  widget?: WidgetRO | null;

  static schema: Realm.ObjectSchema = {
    name: CONVERSATION_RO,
    properties: {
      id: STRING,
      chatroomId: STRING,
      communityId: STRING,
      member: OPTIONAL_MEMBER_RO,
      replyId: OPTIONAL_STRING,
      ogTags: OPTIONAL_LINK_OG_TAGS_RO,
      answer: STRING,
      state: INT,
      createdEpoch: INT,
      createdAt: OPTIONAL_STRING,
      cardId: OPTIONAL_STRING,
      attachments: LIST_ATTACHMENT_RO,
      replyConversation: OPTIONAL_STRING,
      replyConversationObject: OPTIONAL_REPLY_CONVERSATION_RO,
      date: OPTIONAL_STRING,
      isEdited: OPTIONAL_BOOLEAN,
      lastSeen: BOOLEAN,
      replyConversationId: OPTIONAL_STRING,
      userId: OPTIONAL_STRING,
      deletedBy: OPTIONAL_STRING,
      attachmentCount: OPTIONAL_INT,
      attachmentsUploaded: OPTIONAL_BOOLEAN,
      uploadWorkerUUID: OPTIONAL_STRING,
      localSavedEpoch: INT,
      temporaryId: OPTIONAL_STRING,
      reactions: LIST_REACTION_RO,
      hasFiles: OPTIONAL_BOOLEAN,
      isAnonymous: OPTIONAL_BOOLEAN,
      allowAddOption: OPTIONAL_BOOLEAN,
      pollType: OPTIONAL_INT,
      pollTypeText: OPTIONAL_STRING,
      submitTypeText: OPTIONAL_STRING,
      deletedByUserId: OPTIONAL_STRING,
      expiryTime: OPTIONAL_INT,
      multipleSelectNo: OPTIONAL_INT,
      multipleSelectState: OPTIONAL_INT,
      polls: LIST_POLL_RO,
      pollAnswerText: OPTIONAL_STRING,
      toShowResults: OPTIONAL_BOOLEAN,
      replyChatRoomId: OPTIONAL_STRING,
      isInProgress: OPTIONAL_STRING,
      lastUpdatedAt: INT,
      deletedByMember: OPTIONAL_MEMBER_RO,
      community: {
        type: LINKING_OBJECTS,
        objectType: COMMUNITY_RO,
        property: CONVERSATIONS,
      },
      chatroom: {
        type: LINKING_OBJECTS,
        objectType: CHATROOM_RO,
        property: CONVERSATIONS,
      },
      widgetId: STRING,
      widget: OPTIONAL_WIDGET_RO,
    },
    primaryKey: ID,
  };
}
