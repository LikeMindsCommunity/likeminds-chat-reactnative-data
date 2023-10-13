import {
  BOOLEAN,
  CHATROOMS,
  CHATROOM_RO,
  COMMUNITY_RO,
  ID,
  INT,
  LINKING_OBJECTS,
  LIST_CONVERSATION_RO,
  LIST_INT,
  LIST_REACTION_RO,
  OPTIONAL_BOOLEAN,
  OPTIONAL_INT,
  OPTIONAL_LIST_COMMUNITY_RO,
  OPTIONAL_MEMBER_RO,
  OPTIONAL_STRING,
  OPTONAL_CONVERSATION_RO,
  OPTONAL_LAST_CONVERSATION_RO,
  STRING,
} from "../constants";
import { CommunityRO } from "./CommunityRO";
import { ConversationRO } from "./ConversationRO";
import { LastConversationRO } from "./LastConversationRO";
import { MemberRO } from "./MemberRO";
import Realm from "realm";

export class ChatroomRO extends Realm.Object<ChatroomRO> {
  id!: string;
  communityId!: string;
  title!: string;
  state!: number;
  member?: MemberRO | null;
  createdAt?: number | null;
  type?: number | null;
  chatroomImageUrl?: string | null;
  header?: string | null;
  cardCreationTime?: string | null;
  totalResponseCount!: number;
  totalAllResponseCount!: number;
  muteStatus: boolean | null;
  followStatus?: boolean;
  hasBeenNamed?: boolean | null;
  date?: string | null;
  isTagged?: boolean | null;
  isPending?: boolean | null;
  isPrivateMember?: boolean;
  deletedBy?: string | null;
  updatedAt?: number | null;
  lastConversation?: ConversationRO | null;
  lastConversationRO?: LastConversationRO | null;
  lastSeenConversationId?: string | null;
  lastSeenConversation?: ConversationRO | null;
  dateEpoch?: number | null;
  unseenCount!: number;
  relationshipNeeded!: boolean;
  draftConversation?: string | null;
  isSecret?: boolean | null;
  chatroomWithUserId?: number | null;
  chatroomWithUserName?: string | null;
  secretChatRoomLeft?: boolean | null;
  conversations?: Realm.List<ConversationRO>;
  topicId?: string | null;
  topic?: ConversationRO | null;
  autoFollowDone?: boolean | null;
  memberCanMessage?: boolean | null;
  isEdited?: boolean | null;
  unreadConversationsCount?: number | null;
  accessWithoutSubscription!: boolean;
  externalSeen?: boolean | null;
  isConversationStored!: boolean;
  isDraft?: boolean | null;
  lastConversationId?: string | null;
  communities?: Realm.Results<CommunityRO> | null;
  isChatroomVisited!: boolean;
  chatRequestState?: number;
  chatRequestedBy?: MemberRO;
  chatRequestCreatedAt?: number;
  chatRequestedById?: number;
  chatroomWithUser?: MemberRO;

  static schema: Realm.ObjectSchema = {
    name: CHATROOM_RO,
    properties: {
      id: STRING,
      communityId: STRING,
      title: STRING,
      state: INT,
      chatroomWithUser: OPTIONAL_MEMBER_RO,
      chatRequestState: OPTIONAL_INT,
      chatRequestedBy: OPTIONAL_MEMBER_RO,
      chatRequestCreatedAt: OPTIONAL_INT,
      chatRequestedById: OPTIONAL_INT,
      member: OPTIONAL_MEMBER_RO,
      createdAt: OPTIONAL_INT,
      type: OPTIONAL_INT,
      chatroomImageUrl: OPTIONAL_STRING,
      header: OPTIONAL_STRING,
      isPrivateMember: OPTIONAL_BOOLEAN,
      cardCreationTime: OPTIONAL_STRING,
      totalResponseCount: INT,
      totalAllResponseCount: INT,
      muteStatus: OPTIONAL_BOOLEAN,
      followStatus: OPTIONAL_BOOLEAN,
      hasBeenNamed: OPTIONAL_BOOLEAN,
      date: OPTIONAL_STRING,
      isTagged: OPTIONAL_BOOLEAN,
      isPending: OPTIONAL_BOOLEAN,
      deletedBy: OPTIONAL_STRING,
      updatedAt: OPTIONAL_INT,
      lastConversation: OPTONAL_CONVERSATION_RO,
      lastConversationRO: OPTONAL_LAST_CONVERSATION_RO,
      lastSeenConversationId: OPTIONAL_STRING,
      lastSeenConversation: OPTONAL_CONVERSATION_RO,
      dateEpoch: OPTIONAL_INT,
      unseenCount: INT,
      chatroomWithUserId: OPTIONAL_INT,
      relationshipNeeded: BOOLEAN,
      draftConversation: OPTIONAL_STRING,
      chatroomWithUserName: OPTIONAL_STRING,
      isSecret: OPTIONAL_BOOLEAN,
      secretChatRoomLeft: OPTIONAL_BOOLEAN,
      conversations: LIST_CONVERSATION_RO,
      topicId: OPTIONAL_STRING,
      topic: OPTONAL_CONVERSATION_RO,
      autoFollowDone: OPTIONAL_BOOLEAN,
      memberCanMessage: OPTIONAL_BOOLEAN,
      isEdited: OPTIONAL_BOOLEAN,
      unreadConversationsCount: OPTIONAL_INT,
      accessWithoutSubscription: BOOLEAN,
      externalSeen: OPTIONAL_BOOLEAN,
      isConversationStored: BOOLEAN,
      isDraft: OPTIONAL_BOOLEAN,
      lastConversationId: OPTIONAL_STRING,
      communities: {
        type: LINKING_OBJECTS,
        objectType: COMMUNITY_RO,
        property: CHATROOMS,
      },
      isChatroomVisited: BOOLEAN,
    },
    primaryKey: ID,
  };
}
