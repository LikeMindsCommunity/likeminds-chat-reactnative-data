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
import { getChatroom, getChatrooms } from "./queries/chatroom";

// convertToTimeStampRO method takes TimeStamp and converts it to TimeStampRO
export const convertToTimeStampRO = (
  minTimeStamp: number,
  maxTimeStamp: number
): TimeStampRO => {
  const timeStampRO: TimeStampRO = {
    minTimeStamp: minTimeStamp,
    maxTimeStamp: maxTimeStamp,
    ...dummyKeys(TimeStampRO),
  };
  return timeStampRO;
};

// convertToCommunity method takes Community data and converts it to CommunityRO
export const convertToCommunity = (community: Community): CommunityRO => {
  let communityRO: CommunityRO = {
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
  communityId: any
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
    isOwner: member.isOwner,
    isGuest: member.isGuest,
    userUniqueId: member.userUniqueId,
    uuid: member.uuid,
    sdkClientInfo: convertedSdkClientInfo,
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
const convertToPoll = (polls: Poll[], communityId: string): List<PollRO> => {
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
    reaction.member != undefined
      ? convertToMemberRO(reaction.member, communityId)
      : null;
  const reactionRO: ReactionRO = {
    member: convertedMember,
    reaction: reaction.reaction,
    ...dummyKeys(ReactionRO),
  };
  return reactionRO;
};

// convertToConversationRO method takes Conversation data and converts it to ConversationRO
export const convertToConversationRO = (
  conversation: Conversation,
  chatroomCreatorRO: MemberRO,
  chatroomId: string,
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
    createdAt: conversation?.createdAt || null,
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
    localSavedEpoch: conversation?.localCreatedEpoch || 0,
    temporaryId: conversation?.temporaryId || null,
    isAnonymous: conversation?.isAnonymous || null,
    hasFiles: conversation?.hasFiles || false,
    allowAddOption: conversation?.allowAddOption || null,
    pollType: conversation?.pollType || null,
    isInProgress: conversation?.isInProgress || null,
    pollTypeText: conversation?.pollTypeText || null,
    submitTypeText: conversation?.submitTypeText || null,
    expiryTime: conversation?.expiryTime || null,
    multipleSelectNum: conversation?.multipleSelectNo || null,
    multipleSelectState: conversation?.multipleSelectState || null,
    pollAnswerText: conversation?.pollAnswerText || null,
    toShowResults: conversation?.toShowResults || null,
    replyChatRoomId: conversation?.replyChatroomId || null,
    lastUpdatedAt: conversation?.lastUpdated || 0,
    deletedByUserId: conversation.deletedByUserId?.toString() || null,
    replyConversationObject:
      conversation?.replyConversationObject != undefined
        ? convertToConversationRO(
            conversation?.replyConversationObject,
            convertToMemberRO(
              conversation?.replyConversationObject?.member,
              conversation?.replyConversationObject?.communityId
            ),
            chatroomId?.toString(),
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
    ...dummyKeys(ConversationRO),
  };
  return conversationRO;
};

// convertToChatroomRO method takes Chatroom data and converts it to ChatroomRO
export const convertToChatroomRO = (
  realm: Realm,
  chatroom: Chatroom,
  member: MemberRO,
  lastConversationRO?: LastConversationRO
): ChatroomRO => {
  //Query to get lastConversation from realm
  const conversations = realm.objects(ConversationRO.schema.name);
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

  //Query to get existingChatroom from realm
  const existingChatrooms = realm.objects(ChatroomRO.schema.name);
  const chatroomData = existingChatrooms.filtered(
    `id = "${chatroom?.id?.toString()}"`
  );
  const chatroomObject = chatroomData.map((existingChatroom) => {
    const stringifiedChatroom = JSON.stringify(existingChatroom);
    return {
      ...JSON.parse(stringifiedChatroom),
    };
  });
  const currentChatroom = chatroomObject[0];

  //To create updatedAt key
  const updatedAt =
    lastConversationRO?.lastUpdatedAt ??
    currentChatroom?.lastConversationRO?.createdEpoch ??
    chatroom.createdAt;

  const chatroomRO: ChatroomRO = {
    id: chatroom.id?.toString(),
    communityId: chatroom.communityId?.toString(),
    title: chatroom.title,
    state: chatroom.state,
    member: member,
    createdAt: chatroom.createdAt || null,
    type: chatroom.type || 0,
    chatroomImageUrl: chatroom.chatroomImageUrl || null,
    header: chatroom.header || null,
    cardCreationTime: chatroom.cardCreationTime || null,
    lastSeenConversation: lastSeenConversationStringified[0]
      ? lastSeenConversationStringified[0]
      : null,
    totalResponseCount:
      chatroom?.totalResponseCount == undefined
        ? 0
        : parseInt(chatroom.totalResponseCount),
    totalAllResponseCount:
      chatroom?.totalAllResponseCount == undefined
        ? 0
        : parseInt(chatroom.totalAllResponseCount),
    muteStatus: chatroom.muteStatus || false,
    followStatus: chatroom.followStatus || null,
    hasBeenNamed: chatroom.hasBeenNamed || null,
    date: chatroom.date || null,
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
    secretChatRoomLeft: chatroom.secretChatroomLeft || null,
    topicId: chatroom.topicId?.toString() || null,
    autoFollowDone: chatroom.autoFollowDone || null,
    memberCanMessage: chatroom.memberCanMessage || null,
    isEdited: chatroom.isEdited || null,
    unreadConversationsCount: chatroom.unreadConversationCount || null,
    accessWithoutSubscription: chatroom.accessWithoutSubscription || false,
    externalSeen: chatroom.externalSeen || null,
    isConversationStored: chatroom?.isConversationStored || false,
    lastConversationId: chatroom.lastConversationId?.toString() || null,
    isChatroomVisited: !!currentChatroom?.isChatroomVisited
      ? currentChatroom?.isChatroomVisited
      : false,
    ...dummyKeys(ChatroomRO),
  };

  return chatroomRO;
};
