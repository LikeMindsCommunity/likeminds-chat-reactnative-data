import { ConversationRO } from "../models/ConversationRO";

export const realmDbMigration = (oldVersion: Realm, newVersion: Realm) => {
  if (oldVersion.schemaVersion == 1) {
    const oldObjects = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );
    // Perform the migration by iterating through existing objects and setting the new property
    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      newVersion.create(ConversationRO.schema.name, {
        id: oldObject?.id,
        chatroomId: oldObject?.chatroomId,
        communityId: oldObject?.communityId,
        cardId: oldObject?.cardId,
        member: oldObject?.member,
        ogTags: null, // Initialize the new property for existing objects
        answer: oldObject?.answer,
        state: oldObject?.state,
        createdEpoch: oldObject?.createdEpoch,
        createdAt: oldObject?.createdAt,
        attachments: oldObject?.attachments,
        date: oldObject?.date,
        isEdited: oldObject?.isEdited,
        lastSeen: oldObject?.lastSeen,
        replyConversation: oldObject?.replyConversation,
        replyConversationId: oldObject?.replyConversationId,
        replyConversationObject: oldObject?.replyConversationObject,
        deletedBy: oldObject?.deletedBy,
        attachmentCount: oldObject?.attachmentCount,
        userId: oldObject?.userId,
        attachmentsUploaded: oldObject?.attachmentsUploaded,
        uploadWorkerUUID: oldObject?.uploadWorkerUUID,
        localSavedEpoch: oldObject?.localSavedEpoch,
        temporaryId: oldObject?.temporaryId,
        reactions: oldObject?.reactions,
        isAnonymous: oldObject?.isAnonymous,
        allowAddOption: oldObject?.allowAddOption,
        pollType: oldObject?.pollType,
        pollTypeText: oldObject?.pollTypeText,
        submitTypeText: oldObject?.submitTypeText,
        expiryTime: oldObject?.expiryTime,
        multipleSelectNo: oldObject?.multipleSelectNo,
        multipleSelectState: oldObject?.multipleSelectState,
        polls: oldObject?.polls,
        pollAnswerText: oldObject?.pollAnswerText,
        toShowResults: oldObject?.toShowResults,
        replyChatRoomId: oldObject?.replyChatRoomId,
        replyId: oldObject?.replyId,
        isInProgress: oldObject?.isInProgress,
        hasFiles: oldObject?.hasFiles,
        lastUpdatedAt: oldObject?.lastUpdatedAt,
        deletedByMember: oldObject?.deletedByMember,
        deletedByUserId: oldObject?.deletedByUserId,
        community: oldObject?.community,
        chatroom: oldObject?.chatroom,
      });
    }
  }
};

export const DB_SCHEMA_NAME = "likeminds-chat-sdk-rn";
export const DB_SCHEMA_VERSION = 2;
