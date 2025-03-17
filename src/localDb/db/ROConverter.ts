import { List } from "realm";
import Realm from "realm";
import { AttachmentMetaRO } from "../models/AttachmentMetaRO";
import { AttachmentRO } from "../models/AttachmentRO";
import { ChatroomRO } from "../models/ChatroomRO";
import { CommunityRO } from "../models/CommunityRO";
import { LastConversationRO } from "../models/LastConversationRO";
import { MemberRO } from "../models/MemberRO";
import { SDKClientInfoRO } from "../models/SDKClientInfoRO";
import { Chatroom } from "../../shared/responseModels/Chatroom";
import { Community } from "../../shared/responseModels/Community";
import { Conversation } from "../../shared/responseModels/Conversation";
import { Member } from "../../shared/responseModels/Member";
import { SDKClientInfo } from "../../shared/responseModels/SDKClientInfo";
import { ConversationRO } from "../models/ConversationRO";
import { AttachmentMeta } from "../../shared/responseModels/AttachmentMeta";
import { Poll } from "../../shared/responseModels/Poll";
import { PollRO } from "../models/PollRO";
import { Reaction } from "../../shared/responseModels/Reaction";
import { ReactionRO } from "../models/ReactionRO";
import { Attachment } from "../../shared/responseModels/Attachment";
import { dummyKeys } from "../constants/dummyKeys";
import { TimeStampRO } from "../models/TimeStampRO";
import { AppConfigRO } from "../models/AppConfigRO";
import { LinkOGTags } from "src/shared/responseModels/LinkOGTags";
import { LinkOGTagsRO } from "../models/LinkOGTagsRO";
import { APP_CONFIG, FILTER_CONVERSATION_STATE } from "../constants";
import { FilterConversationStateRO } from "../models/FilterConversationStateRO";
import { ConversationState } from "src/enums";
import { WidgetRO } from "../models/WidgetRO";
import { Widget } from "../../shared/responseModels/Widget";
import { LMLogDBModelRO, LMSDKMetaDBModelRO, LMStackTraceDBModelRO } from "../models/LogRO";
import { LMSeverity } from "../../enums/LMSeverity";
import { LMStackTrace } from "../../shared/responseModels/LMStackTrace";
import { LMSDKMeta } from "../../shared/responseModels/LMSDKMeta";
import { Log } from "../../shared/responseModels/Log";

// convertToAppConfigRO method takes AppConfig and converts it to AppConfigRO
export const convertToAppConfigRO = (): AppConfigRO => {
  const appConfigRO: AppConfigRO = {
    id: APP_CONFIG,
    isGroupFeedChatroomsSynced: false,
    isDmFeedChatroomsSynced: false,
    chatroomIdWithAIChatbot: "",
    ...dummyKeys(AppConfigRO),
  };
  return appConfigRO;
};

// convertToFilterConversationStateRO method takes convertedFilterConversationState and converts it to FilterConversationStateRO
export const convertToFilterConversationStateRO = (
  convertedFilterConversationState?: ConversationState[]
): FilterConversationStateRO => {
  const filterConversationStateRO: FilterConversationStateRO = {
    id: FILTER_CONVERSATION_STATE,
    filterConversationState: convertedFilterConversationState,
    ...dummyKeys(FilterConversationStateRO),
  };
  return filterConversationStateRO;
};

// convertToTimeStampRO method takes TimeStamp and converts it to TimeStampRO
export const convertToTimeStampRO = (): TimeStampRO => {
  const timeStampRO: TimeStampRO = {
    minTimeStampDm: 0,
    minTimeStampGroup: 0,
    ...dummyKeys(TimeStampRO),
  };
  return timeStampRO;
};

// convertToCommunity method takes Community data and converts it to CommunityRO
export const convertToCommunity = (community: Community): CommunityRO => {
  const communityRO: CommunityRO = {
    id: community?.id?.toString(),
    name: community?.name?.toString(),
    imageUrl: community?.imageUrl,
    membersCount: community?.membersCount,
    updatedAt: community?.updatedAt,
    relationshipNeeded: true,
    ...dummyKeys(CommunityRO),
  };
  return communityRO;
};

// convertToLastConversationRO method takes Conversation data and converts it to LastConversationRO
export const convertToLastConversationRO = (
  lastConversation: Conversation,
  chatroomCreatorRO: MemberRO,
  chatroomId: string,
  attachment: Attachment[],
  deletedByMember: MemberRO | null
): LastConversationRO => {
  const lastConversationRO: LastConversationRO = {
    id: lastConversation?.id?.toString() || "",
    member: chatroomCreatorRO,
    createdAt: lastConversation.createdAt || null,
    answer: lastConversation.answer,
    state: lastConversation.state,
    attachments: convertToAttachment(
      attachment,
      chatroomId?.toString(),
      lastConversation.communityId?.toString()
    ),
    date: lastConversation.date || null,
    deletedBy: lastConversation.deletedBy || null,
    uploadWorkerUUID: lastConversation.uploadWorkerUUID,
    createdEpoch: lastConversation.createdEpoch,
    chatroomId: chatroomId?.toString(),
    communityId: lastConversation.communityId?.toString(),
    attachmentCount: lastConversation.attachmentCount,
    attachmentsUploaded: lastConversation.attachmentUploaded,
    lastUpdatedAt: lastConversation?.lastUpdatedAt || 0,
    deletedByMember: deletedByMember,
    ...dummyKeys(LastConversationRO),
  };

  return lastConversationRO;
};

// convertToPollRO method takes Poll data and converts it to PollRO
export const convertToPollRO = (poll: Poll, communityId: string) => {
  const pollRO: PollRO = {
    id: poll?.id?.toString(),
    text: poll?.text,
    subText: poll.subText,
    isSelected: poll.isSelected,
    percentage: poll.percentage,
    noVotes: poll.noVotes,
    member:
      poll.member != undefined
        ? convertToMemberRO(poll?.member, communityId)
        : null,
    ...dummyKeys(PollRO),
  };
  return pollRO;
};

// convertToAttachmentMetaRO method takes AttachmentMeta data and converts it to AttachmentMetaRO
const convertToAttachmentMetaRO = (attachmentMeta: AttachmentMeta) => {
  const attachmentMetaRO: AttachmentMetaRO = {
    numberOfPage: attachmentMeta?.numberOfPage,
    size: attachmentMeta?.size,
    duration: attachmentMeta?.duration,
    ...dummyKeys(AttachmentMetaRO),
  };
  return attachmentMetaRO;
};

// convertToAttachmentRO method takes Attachment data and converts it to AttachmentRO
export const convertToAttachmentRO = (
  index: number,
  attachment: Attachment,
  chatroomId: string,
  communityId: string
): AttachmentRO => {
  const attachmentRO: AttachmentRO = {
    id: index.toString(),
    url:
      attachment.url == undefined
        ? attachment?.fileUrl?.toString()
        : attachment?.url?.toString(),
    name: attachment?.name,
    type: attachment?.type,
    index: attachment?.index,
    isUploaded: attachment?.isUploaded ?? false,
    width: attachment?.width,
    height: attachment?.height,
    awsFolderPath: attachment?.awsFolderPath,
    localFilePath: attachment?.localFilePath,
    thumbnailUrl: attachment?.thumbnailUrl,
    thumbnailAWSFolderPath: attachment?.thumbnailAWSFolderPath,
    thumbnailLocalFilePath: attachment?.thumbnailLocalFilePath,
    metaRO: attachment ? convertToAttachmentMetaRO(attachment.meta) : null,
    createdAt: attachment?.createdAt,
    updatedAt: attachment?.updatedAt,
    chatroomId: chatroomId,
    communityId: communityId,
    ...dummyKeys(AttachmentRO),
  };

  return attachmentRO;
};

// convertToSDKClientInfoRO method takes SDKClientInfo data and converts it to SDKClientInfoRO
const convertToSDKClientInfoRO = (
  sdkClientInfo: SDKClientInfo
): SDKClientInfoRO => {
  const sdkClientInfoRO: SDKClientInfoRO = {
    community:
      sdkClientInfo.community != undefined
        ? sdkClientInfo.community.toString()
        : sdkClientInfo.communityId.toString(),
    user: sdkClientInfo.user.toString(),
    userUniqueId: sdkClientInfo.userUniqueId,
    uuid: sdkClientInfo.uuid,
    ...dummyKeys(SDKClientInfoRO),
  };
  return sdkClientInfoRO;
};

// convertToMemberRO method takes Member data and converts it to MemberRO
export const convertToMemberRO = (
  member: Member,
  communityId: string
): MemberRO | undefined => {
  if (!member?.sdkClientInfo) return undefined;

  const convertedSdkClientInfo = convertToSDKClientInfoRO(
    member?.sdkClientInfo
  );
  const memberRO: MemberRO = {
    uid: member.id.toString(),
    id: member.id.toString(),
    name: member.name,
    imageUrl: member.imageUrl || "",
    state: member.state || 0,
    customIntroText: member.customIntroText || null,
    customClickText: member.customClickText || null,
    customTitle: member.customTitle || null,
    communityId: communityId.toString(),
    isOwner: member.isOwner || false,
    isGuest: member.isGuest,
    userUniqueId: member.userUniqueId,
    uuid: member.uuid,
    sdkClientInfo: convertedSdkClientInfo,
    roles: JSON.stringify(member?.roles ?? []),
    ...dummyKeys(MemberRO),
  };
  return memberRO;
};

// convertToAttachment method takes Attachment[] data and converts it to Realm.List<AttachmentRO>
const convertToAttachment = (
  attachments: Attachment[],
  chatroomId: string,
  communityId: string
): List<AttachmentRO> => {
  let convertedAttachments: any = [];
  if (attachments == undefined) return convertedAttachments;
  for (let i = 0; i < attachments.length; i++) {
    const roAttachment = convertToAttachmentRO(
      i,
      attachments[i],
      chatroomId,
      communityId
    );
    convertedAttachments = [...convertedAttachments, roAttachment];
  }

  return convertedAttachments;
};

// convertToWidgetRO method takes Widget data and converts it to WidgetRO
export const convertToWidgetRO = (widgetId: string, widget: Widget): WidgetRO => {
  const widgetRO = {
    id: widgetId.toString(),
    parentEntityId: widget?.parentEntityId,
    parentEntityType: widget?.parentEntityType,
    metadata:
      typeof widget?.metadata === "string"
        ? widget?.metadata
        : JSON.stringify(widget?.metadata),
    lmMeta: widget?.LmMeta
      ? typeof widget?.LmMeta === "string"
        ? widget?.LmMeta
        : JSON.stringify(widget?.LmMeta)
      : null,
    createdAt: widget?.createdAt,
    updatedAt: widget?.updatedAt,
    ...dummyKeys(WidgetRO),
  };
  return widgetRO;
};

// convertToWidget method takes Widget data and converts it to WidgetRO
export const convertToWidget = (widgetId: string, widget: Widget): WidgetRO => {
  let convertedWidget = null;
  if (widgetId == "" && widget) return convertedWidget;
  const roAttachment = convertToWidgetRO(widgetId, widget);
  convertedWidget = roAttachment;

  return convertedWidget;
};

// convertToReaction method takes Reaction[] data and converts it to Realm.List<ReactionRO>
const convertToReaction = (
  reactions: Reaction[],
  communityId: string
): List<ReactionRO> => {
  let convertedReactions: any = [];
  if (reactions == undefined) return convertedReactions;
  for (let i = 0; i < reactions.length; i++) {
    const roAttachment = convertToReactionRO(reactions[i], communityId);
    convertedReactions = [...convertedReactions, roAttachment];
  }
  return convertedReactions;
};

// convertToPoll method takes Poll[] data and converts it to Realm.List<PollRO>
export const convertToPoll = (
  polls: Poll[],
  communityId: string
): List<PollRO> => {
  let convertedPolls: any = [];
  if (polls == undefined) return convertedPolls;
  for (let i = 0; i < polls.length; i++) {
    const roAttachment = convertToPollRO(polls[i], communityId);
    convertedPolls.push(roAttachment);
  }
  return convertedPolls;
};

// convertToReactionRO method takes Reaction data and converts it to ReactionRO
const convertToReactionRO = (
  reaction: Reaction,
  communityId: string
): ReactionRO => {
  const convertedMember =
    reaction?.member != undefined
      ? convertToMemberRO(reaction?.member, communityId)
      : null;
  const reactionRO: ReactionRO = {
    member: convertedMember,
    reaction: reaction.reaction,
    ...dummyKeys(ReactionRO),
  };
  return reactionRO;
};

const convertToLinkOgTagRO = (linkOgTag: LinkOGTags): LinkOGTagsRO => {
  const convertedLinkOgTags: LinkOGTagsRO = {
    description: linkOgTag?.description,
    image: linkOgTag?.image,
    url: linkOgTag?.url,
    title: linkOgTag?.title,
    ...dummyKeys(LinkOGTagsRO),
  };
  return convertedLinkOgTags;
};

// convertToConversationRO method takes Conversation data and converts it to ConversationRO
export const convertToConversationRO = (
  realm: Realm,
  conversation: Conversation,
  chatroomCreatorRO: MemberRO,
  chatroomId: string,
  widgetRO: WidgetRO,
  attachment?: Attachment[],
  polls?: Poll[],
  reactions?: Reaction[]
): ConversationRO => {
  const conversationRO: ConversationRO = {
    id: conversation.id?.toString(),
    chatroomId: chatroomId?.toString(),
    communityId: conversation.communityId?.toString(),
    member: chatroomCreatorRO,
    answer: conversation?.answer,
    state: conversation?.state,
    createdEpoch: conversation?.createdEpoch || 0,
    createdAt: conversation?.createdAt?.toString() || null,
    date: conversation?.date || null,
    isEdited: conversation?.isEdited || null,
    lastSeen: conversation?.lastSeen || false,
    replyConversationId: conversation?.replyConversationId || null,
    deletedBy: conversation?.deletedBy || null,
    deletedByMember:
      conversation.deletedByMember !== undefined
        ? convertToMemberRO(
            conversation.deletedByMember,
            conversation.communityId?.toString()
          )
        : null,
    replyConversation: conversation.replyConversation?.toString(),
    replyId: conversation?.replyId?.toString() || null,
    attachmentCount: conversation?.attachmentCount || null,
    attachmentsUploaded: conversation?.attachmentUploaded || null,
    uploadWorkerUUID: conversation?.uploadWorkerUUID || null,
    localSavedEpoch: conversation?.localCreatedEpoch,
    attachmentUploadedEpoch: conversation?.attachmentUploadedEpoch,
    temporaryId: conversation?.temporaryId || null,
    isAnonymous: conversation?.isAnonymous || null,
    hasFiles: conversation?.hasFiles || false,
    allowAddOption: conversation?.allowAddOption || null,
    pollType: conversation?.pollType || null,
    ogTags:
      conversation?.ogTags !== undefined
        ? convertToLinkOgTagRO(conversation?.ogTags)
        : null,
    isInProgress: conversation?.isInProgress || null,
    pollTypeText: conversation?.pollTypeText || null,
    submitTypeText: conversation?.submitTypeText || null,
    expiryTime: conversation?.expiryTime || null,
    multipleSelectNo: conversation?.multipleSelectNo || null,
    multipleSelectState: conversation?.multipleSelectState || null,
    pollAnswerText: conversation?.pollAnswerText || null,
    toShowResults: conversation?.toShowResults || null,
    replyChatRoomId: conversation?.replyChatroomId || null,
    lastUpdatedAt: conversation?.lastUpdated || 0,
    deletedByUserId: conversation.deletedByUserId?.toString() || null,
    replyConversationObject:
      conversation?.replyConversationObject != undefined
        ? convertToConversationRO(
            realm,
            conversation?.replyConversationObject,
            convertToMemberRO(
              conversation?.replyConversationObject?.member,
              conversation?.replyConversationObject?.communityId
            ),
            chatroomId?.toString(),
            convertToWidget(
              conversation?.replyConversationObject.widgetId,
              conversation.replyConversationObject.widget
            ),
            conversation?.replyConversationObject?.attachments,
            conversation?.replyConversationObject?.polls,
            conversation?.replyConversationObject?.reactions
          )
        : null,
    attachments: convertToAttachment(
      attachment,
      chatroomId?.toString(),
      conversation.communityId?.toString()
    ),
    reactions: convertToReaction(
      reactions,
      conversation?.communityId?.toString()
    ),
    polls: convertToPoll(polls, conversation?.communityId?.toString()),
    widgetId: conversation?.widgetId,
    widget: conversation?.widgetId ? widgetRO : null,
    ...dummyKeys(ConversationRO),
  };
  return conversationRO;
};

// convertToChatroomRO method takes Chatroom data and converts it to ChatroomRO
export const convertToChatroomRO = (
  realm: Realm,
  chatroom: Chatroom,
  member: MemberRO,
  chatroomWithUserRO: MemberRO,
  chatRequestedByRO?: MemberRO,
  lastConversationRO?: LastConversationRO
): ChatroomRO => {
  //Query to get lastConversation from realm
  const conversations = realm.objects<ConversationRO>(
    ConversationRO.schema.name
  );
  const conversation = conversations.filtered(
    `id = "${chatroom?.lastConversationId}"`
  );
  const lastConversation = JSON.parse(JSON.stringify(conversation));

  //Query to get lastSeenConversation from realm
  const lastSeenConversation = conversations.filtered(
    `id = "${chatroom?.lastSeenConversationId}"`
  );
  const lastSeenConversationStringified = JSON.parse(
    JSON.stringify(lastSeenConversation)
  );

  //Query to get all conversations of a chatroom
  const allConversations = conversations.filtered(
    `chatroomId = "${chatroom?.id}"`
  );
  const totalAllResponseCount = allConversations?.length;

  //Query to get normal conversation and not state messages
  const filteredConversation = allConversations.filtered(
    `(state = 0 || state = 10)`
  );
  const totalResponseCount = filteredConversation?.length;

  //Query to get existingChatroom from realm
  const chatroomData = realm
    .objects(ChatroomRO.schema.name)
    .filtered(`id = "${chatroom?.id?.toString()}"`);
  const chatroomObject = chatroomData.map((existingChatroom) => {
    const stringifiedChatroom = JSON.stringify(existingChatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  const currentChatroom = chatroomObject[0];

  //To create updatedAt key
  const updatedAt =
    lastConversationRO?.createdEpoch ??
    currentChatroom?.lastConversationRO?.createdEpoch ??
    chatroom.createdAt;

  const chatroomRO: ChatroomRO = {
    id: chatroom.id?.toString(),
    communityId: chatroom.communityId?.toString(),
    title: chatroom.title,
    state: chatroom?.state,
    member: member,
    createdAt: chatroom?.createdAt || null,
    type: chatroom.type || 0,
    chatroomImageUrl: chatroom.chatroomImageUrl || null,
    header: chatroom.header || null,
    cardCreationTime: chatroom.cardCreationTime || null,
    lastSeenConversation: lastSeenConversationStringified[0]
      ? lastSeenConversationStringified[0]
      : null,
    totalResponseCount: totalResponseCount,
    totalAllResponseCount: totalAllResponseCount,
    muteStatus: chatroom.muteStatus || false,
    followStatus: chatroom?.followStatus || false,
    hasBeenNamed: chatroom.hasBeenNamed || null,
    date: chatroom.date || null,
    isPrivateMember: chatroom?.isPrivateMember || false,
    isTagged: chatroom.isTagged || null,
    isPending: chatroom.isPending || null,
    deletedBy: chatroom.deletedBy || null,
    updatedAt: updatedAt || null,
    chatroomWithUserId:
      chatroom.chatroomWithUserId !== undefined
        ? chatroom.chatroomWithUserId
        : null,
    lastConversation: lastConversation[0],
    lastConversationRO: lastConversationRO,
    lastSeenConversationId: chatroom.lastSeenConversationId?.toString() || null,
    dateEpoch: chatroom.dateEpoch || null,
    unseenCount: chatroom.unseenCount || 0,
    relationshipNeeded: false,
    isSecret: chatroom.isSecret || null,
    chatroomWithUserName:
      chatroom.chatroomWithUserName !== undefined
        ? chatroom.chatroomWithUserName
        : null,
    chatroomWithUser: chatroomWithUserRO,
    secretChatRoomLeft: chatroom.secretChatroomLeft || null,
    topicId: chatroom.topicId?.toString() || null,
    autoFollowDone: chatroom.autoFollowDone || null,
    memberCanMessage: chatroom.memberCanMessage,
    isEdited: chatroom.isEdited || null,
    unreadConversationsCount: chatroom.unreadConversationCount || null,
    accessWithoutSubscription: chatroom.accessWithoutSubscription || false,
    externalSeen: chatroom.externalSeen || null,
    isConversationStored: chatroom?.isConversationStored || false,
    lastConversationId: chatroom.lastConversationId?.toString() || null,
    isChatroomVisited: !!currentChatroom?.isChatroomVisited
      ? currentChatroom?.isChatroomVisited
      : false,
    chatRequestState: chatroom?.chatRequestState,
    chatRequestedBy: chatRequestedByRO,
    chatRequestCreatedAt: chatroom?.chatRequestCreatedAt,
    chatRequestedById: chatroom?.chatRequestedById,
    ...dummyKeys(ChatroomRO),
  };

  return chatroomRO;
};

export const convertToLMStackTraceDBModel = (lmStackTrace: LMStackTrace): LMStackTraceDBModelRO => {
  return {
    exception: lmStackTrace?.exception?.toString(),
    trace: lmStackTrace?.trace?.toString(),
    ...dummyKeys(lmStackTrace)
  }
}

export const convertToLMSDKMetaDBModel = (lmSDKMeta: LMSDKMeta): LMSDKMetaDBModelRO => {
  return {
    dataLayerVersion: lmSDKMeta?.dataLayerVersion?.toString(),
    coreVersion: lmSDKMeta?.coreVersion?.toString(),
    ...dummyKeys(lmSDKMeta)
  }
}

export const convertToLMLogDBModel = (log: Log, lmStackTrace: LMStackTraceDBModelRO, lmSDKMeta: LMSDKMetaDBModelRO): LMLogDBModelRO => {
  return {
    stack_trace: lmStackTrace,
    sdk_meta: lmSDKMeta,
    severity: (log?.severity as LMSeverity)?.toString(),
    timestamp: Date.now(),
    ...dummyKeys(log)
  }
}

