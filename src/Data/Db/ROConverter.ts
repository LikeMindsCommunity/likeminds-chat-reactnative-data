import { List } from "realm";
import { AttachmentMetaRO } from "../Models/AttachmentMetaRO";
import { AttachmentRO } from "../Models/AttachmentRO";
import { ChatroomRO } from "../Models/ChatroomRO";
import { CommunityRO } from "../Models/CommunityRO";
import { LastConversationRO } from "../Models/LastConversationRO";
import { MemberRO } from "../Models/MemberRO";
import { SDKClientInfoRO } from "../Models/SDKClientInfoRO";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { Community } from "src/shared/responseModels/Community";
import { Conversation } from "src/shared/responseModels/Conversation";
import { Member } from "src/shared/responseModels/Member";
import { SDKClientInfo } from "src/shared/responseModels/SDKClientInfo";
import { ConversationRO } from "../Models/ConversationRO";
import { AttachmentMeta } from "src/shared/responseModels/AttachmentMeta";
import { Poll } from "src/shared/responseModels/Poll";
import { PollRO } from "../Models/PollRO";
import { Reaction } from "src/shared/responseModels/Reaction";
import { ReactionRO } from "../Models/ReactionRO";
import { Attachment } from "src/shared/responseModels/Attachment";
import { dummyKeys } from "../Constants/dummyKeys";

export const convertCommunity = (community: Community): CommunityRO => {
  let communityRO: CommunityRO = {
    id: `${community?.id}`,
    name: `${community?.name}`,
    imageUrl: community?.imageUrl,
    membersCount: community?.membersCount,
    updatedAt: community?.updatedAt,
    relationshipNeeded: true,
    downloadableContentTypes: null,
    ...dummyKeys(CommunityRO),
  };
  return communityRO;
};

export const convertToLastConversationRO = (
  lastConversation: Conversation,
  chatroomCreatorRO: MemberRO,
  chatroomId: number,
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
    deletedBy: lastConversation.deletedBy,
    uploadWorkerUUID: lastConversation.uploadWorkerUUID,
    createdEpoch: lastConversation.createdEpoch,
    chatroomId: chatroomId?.toString(),
    communityId: lastConversation.communityId?.toString(),
    attachmentCount: lastConversation.attachmentCount,
    attachmentsUploaded: lastConversation.attachmentUploaded,
    // link:
    deletedByMember: deletedByMember,
    ...dummyKeys(LastConversationRO),
  };

  return lastConversationRO;
};

export const convertToPollRO = (poll: Poll, communityId: string) => {
  const pollRO: PollRO = {
    id: poll?.id,
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

const convertToAttachmentMetaRO = (attachmentMeta: AttachmentMeta) => {
  const attachmentMetaRO: AttachmentMetaRO = {
    numberOfPage: attachmentMeta?.numberOfPage,
    size: attachmentMeta?.size,
    duration: attachmentMeta?.duration,
    ...dummyKeys(AttachmentMetaRO),
  };
  return attachmentMetaRO;
};

export const convertToAttachmentRO = (
  attachment: Attachment,
  chatroomId: string,
  communityId: string
) => {
  const attachmentRO: AttachmentRO = {
    id: attachment?.id?.toString(),
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

const convertToSDKClientInfoRO = (
  sdkClientInfo: SDKClientInfo
): SDKClientInfoRO => {
  const sdkClientInfoRO: SDKClientInfoRO = {
    community: sdkClientInfo?.communityId?.toString(),
    user: `${sdkClientInfo.user}`,
    userUniqueId: sdkClientInfo.userUniqueId,
    uuid: sdkClientInfo.uuid,
    ...dummyKeys(SDKClientInfoRO),
  };

  return sdkClientInfoRO;
};

export const convertToMemberRO = (
  member: Member,
  communityId: any
): MemberRO => {
  const convertedSdkClientInfo = convertToSDKClientInfoRO(member.sdkClientInfo);

  const memberRO: MemberRO = {
    uid: `${member.id}`,
    id: `${member.id}`,
    name: member.name,
    imageUrl: member.imageUrl || "",
    state: member.state || 0,
    customIntroText: member.customIntroText || null,
    customClickText: member.customClickText || null,
    customTitle: member.customTitle || null,
    communityId: `${communityId}`,
    isOwner: member.isOwner,
    isGuest: member.isGuest,
    userUniqueId: member.userUniqueId,
    uuid: member.uuid,
    sdkClientInfoRO: convertedSdkClientInfo,
    ...dummyKeys(MemberRO),
  };

  return memberRO;
};

const convertToAttachment = (
  attachments: Attachment[],
  chatroomId: string,
  communityId: string
): List<AttachmentRO> => {
  let convertedAttachments: any = [];
  for (let i = 0; i < attachments.length; i++) {
    const roAttachment = convertToAttachmentRO(
      attachments[i],
      chatroomId,
      communityId
    );
    convertedAttachments.push(roAttachment);
  }
  return { ...convertedAttachments, ...dummyKeys(AttachmentRO) };
};

const convertToReaction = (
  reactions: Reaction[],
  communityId: string
): List<ReactionRO> => {
  let convertedReactions: any = [];
  for (let i = 0; i < reactions.length; i++) {
    const roAttachment = convertToReactionRO(reactions[i], communityId);
    convertedReactions.push(roAttachment);
  }
  return convertedReactions;
};

const convertToPoll = (polls: Poll[], communityId: string): List<PollRO> => {
  let convertedPolls: any = [];
  for (let i = 0; i < polls.length; i++) {
    const roAttachment = convertToPollRO(polls[i], communityId);
    convertedPolls.push(roAttachment);
  }
  return convertedPolls;
};

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

export const convertToConversationRO = (
  conversation: Conversation,
  chatroomCreatorRO: MemberRO,
  attachment: Attachment[],
  polls: Poll[],
  reactions?: Reaction[]
): ConversationRO => {
  const conversationRO: ConversationRO = {
    id: `${conversation.id}` || "",
    chatroomId: "2889247", //NOPE
    communityId: `${conversation.communityId}` || "",
    member: chatroomCreatorRO,
    answer: conversation?.answer,
    state: conversation?.state,
    createdEpoch: conversation?.createdEpoch || 0,
    createdAt: conversation?.createdAt || null,
    date: conversation?.date || null,
    isEdited: conversation?.isEdited || null,
    lastSeen: conversation?.lastSeen || false, //NOPE
    // replyConversationId: conversation?.replyConversationId || null,  //NOPE
    // deletedBy: conversation?.deletedBy || null, //NOPE
    attachmentCount: conversation?.attachmentCount || null,
    attachmentsUploaded: conversation?.attachmentUploaded || null,
    // uploadWorkerUUID: conversation?.uploadWorkerUUID || null, //NOPE
    localSavedEpoch: conversation?.localCreatedEpoch || 0, //NOPE
    // temporaryId: conversation?.temporaryId || null,  //NOPE
    isAnonymous: conversation?.isAnonymous || null,
    allowAddOption: conversation?.allowAddOption || null,
    pollType: conversation?.pollType || null,
    pollTypeText: conversation?.pollTypeText || null,
    submitTypeText: conversation?.submitTypeText || null,
    expiryTime: conversation?.expiryTime || null,
    multipleSelectNum: conversation?.multipleSelectNo || null,
    multipleSelectState: conversation?.multipleSelectState || null,
    pollAnswerText: conversation?.pollAnswerText || null,
    toShowResults: conversation?.toShowResults || null,
    replyChatRoomId: conversation?.replyChatroomId || null,
    lastUpdatedAt: conversation?.lastUpdated || 0,
    attachments: convertToAttachment(
      attachment,
      "2889247",
      `${conversation.communityId}`
    ),
    reactions: reactions
      ? convertToReaction(reactions, `${conversation?.communityId}`)
      : null, // Fetch reaction first from API resp
    polls: convertToPoll(polls, `${conversation?.communityId}`),
    // TODO
    // replyConversation: conversation?.replyConversation
    //   ? new Realm?.List<ConversationRO>(
    //       conversation?.replyConversation?.map((replyConv) => convertConversationToRO(replyConv))
    //     )
    //   : null,
    ...dummyKeys(ConversationRO),
  };

  return conversationRO;
};

const convertToSecretChatroomParticipants = (
  secretChatroomParticipants: number[]
): List<number> => {
  let convertedAttachments: any = [];
  for (let i = 0; i < secretChatroomParticipants.length; i++) {
    convertedAttachments.push(secretChatroomParticipants[i]);
  }
  return convertedAttachments;
};

export const convertToChatroomRO = (
  chatroom: Chatroom,
  member: MemberRO,
  lastConversation: ConversationRO,
  lastConversationRO?: LastConversationRO
): ChatroomRO => {
  const chatroomRO: ChatroomRO = {
    id: chatroom.id?.toString(),
    communityId: `${chatroom.communityId}` || "",
    title: chatroom.title,
    state: chatroom.state,
    member: member,
    createdAt: chatroom.createdAt || null,
    type: chatroom.type || null,
    chatroomImageUrl: chatroom.chatroomImageUrl || null,
    header: chatroom.header || null,
    cardCreationTime: chatroom.cardCreationTime || null,
    totalResponseCount:
      chatroom?.totalResponseCount == undefined
        ? 0
        : parseInt(chatroom.totalResponseCount), //TODO
    totalAllResponseCount:
      chatroom?.totalAllResponseCount == undefined
        ? 0
        : parseInt(chatroom.totalAllResponseCount), // TODO
    muteStatus: chatroom.muteStatus || null,
    followStatus: chatroom.followStatus || null,
    hasBeenNamed: chatroom.hasBeenNamed || null,
    date: chatroom.date || null,
    isTagged: chatroom.isTagged || null,
    isPending: chatroom.isPending || null,
    deletedBy: chatroom.deletedBy || null,
    updatedAt: chatroom.updatedAt || null,
    lastConversation: lastConversation,
    lastConversationRO: lastConversationRO,
    lastSeenConversationId: chatroom.lastSeenConversationId || null,
    dateEpoch: chatroom.dateEpoch || null,
    unseenCount: chatroom.unseenCount || 0,
    relationshipNeeded: false, // Assign as needed
    isSecret: chatroom.isSecret || null,
    secretChatRoomParticipants: chatroom?.secretChatroomParticipants
      ? convertToSecretChatroomParticipants(
          chatroom?.secretChatroomParticipants
        )
      : new List(),
    secretChatRoomLeft: chatroom.secretChatroomLeft || null,
    topicId: `${chatroom.topicId}` || null,
    autoFollowDone: chatroom.autoFollowDone || null,
    memberCanMessage: chatroom.memberCanMessage || null,
    isEdited: chatroom.isEdited || null,
    reactions: chatroom?.reactions
      ? convertToReaction(chatroom?.reactions, `${chatroom.communityId}`)
      : null,
    unreadConversationsCount: chatroom.unreadConversationCount || null,
    accessWithoutSubscription: chatroom.accessWithoutSubscription || false,
    externalSeen: chatroom.externalSeen || null,
    isConversationStored: chatroom?.isConversationStored || false, // Assign as needed
    lastConversationId: `${chatroom.lastConversationId}` || null,
    ...dummyKeys(ChatroomRO),
  };

  return chatroomRO;
};
