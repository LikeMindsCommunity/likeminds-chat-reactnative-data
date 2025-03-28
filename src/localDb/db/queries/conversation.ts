import { Conversation } from "src/shared/responseModels/Conversation";
import { CommunityRO } from "../../models/CommunityRO";
import { ConversationRO } from "../../models/ConversationRO";
import { MemberRO } from "../../models/MemberRO";
import {
  convertToCommunity,
  convertToMemberRO,
  convertToConversationRO,
  convertToChatroomRO,
  convertToPoll,
  convertToWidget,
} from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { SyncConversationResponse } from "src/sync/model/syncConversationResponse";
import ChatDBUtil from "src/localDb/utils/chatDbUtils";
import { Member } from "src/shared/responseModels/Member";
import { ChatroomRO } from "src/localDb/models/ChatroomRO";
import { GetConversationsRequest } from "src/localDb/models/requestModels/GetConversationsRequest";
import { GetConversationsType } from "src/localDb/models/requestModels/GetConversationsType";
import { deleteChatroomTopic } from "./chatroom";
import { getFilterConversationState } from "./filterConversationState";
import { WidgetRO } from "../../models/WidgetRO";
import { Attachment } from "../../../shared/responseModels/Attachment";
import { AttachmentRO } from "src/localDb/models/AttachmentRO";
import UpdateAttachmentRequest from "../../models/requestModels/UpdateAttachmentRequest";
import UpdateConversationDataRequest from "../../models/requestModels/UpdateConversationDataRequest";

export async function saveConversationData(
  data: SyncConversationResponse,
  chatroomData: { [key: string]: Chatroom },
  conversationData: Conversation[],
  communityId: string,
  widgets?: { [key: string]: any }
) {
  const chatDbUtil = new ChatDBUtil();
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      // save community
      const community = data?.communityMeta[communityId];
      if (community) {
        const communityRO = convertToCommunity(community);
        if (communityRO) {
          realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);
        }
      }

      // save chatroom
      const chatroomId = Object.keys(chatroomData || {});
      const chatroom = chatroomData[chatroomId[0]];
      const creatorId = chatroom?.userId;
      const creator = data?.userMeta[creatorId?.toString()];
      let conversationCreatorRO = null
      if (creator) {
        conversationCreatorRO = convertToMemberRO(creator, communityId);
        if (conversationCreatorRO) {
          realm.create(
            MemberRO.schema.name,
            conversationCreatorRO,
            Realm.UpdateMode.All
          );
        }
      }

      const chatRequestedById = chatroom?.chatRequestedById;
      let chatRequestedByRO;
      if (chatRequestedById) {
        const chatRequestedBy = data?.userMeta[chatRequestedById?.toString()];
        if (chatRequestedBy) {
          chatRequestedByRO = convertToMemberRO(chatRequestedBy, communityId);
          if (chatRequestedByRO) {
            realm.create(
              MemberRO.schema.name,
              chatRequestedByRO,
              Realm.UpdateMode.All
            );
          }
        }
      }

      const chatroomWithUserId = chatroom?.chatroomWithUserId;
      let chatroomWithUserRO;
      if (chatroomWithUserId !== null) {
        const chatroomWithUser = data?.userMeta[chatroomWithUserId?.toString()];
        if (chatroomWithUser) {
          chatroomWithUserRO = convertToMemberRO(chatroomWithUser, communityId);
          if (chatroomWithUserRO) {
            realm.create(
              MemberRO.schema.name,
              chatroomWithUserRO,
              Realm.UpdateMode.All
            );
          }
        }
      }

      if (chatroom &&
        conversationCreatorRO &&
        chatroomWithUserRO) {
        const chatroomRO = convertToChatroomRO(
          realm,
          chatroom,
          conversationCreatorRO,
          chatroomWithUserRO,
          chatRequestedByRO
        );

        if (chatroomRO) {
          realm.create(ChatroomRO.schema.name, chatroomRO, Realm.UpdateMode.All);
        }
      }

      // save conversations
      conversationData.map((item) => {
        const conversation = item;

        // save conversation creator
        const creatorId = conversation?.userId;
        const creator = data?.userMeta[creatorId?.toString()] ?? conversation?.member;
        if (!creator) return;

        // save conversation widget
        const conversationCreatorRO = convertToMemberRO(creator, communityId);
        const conversationWidget = conversation.widgetId
          ? data.widgets[conversation.widgetId] ?? Object.keys(widgets ?? {})?.length ? widgets[conversation.widgetId] ?? null : null
          : null;
        let conversationWidgetRO;
        if (Object.keys(conversationWidget || {}).length > 0) {
          conversationWidgetRO = convertToWidget(
            conversation.widgetId,
            conversationWidget
          );
          realm.create(
            WidgetRO.schema.name,
            conversationWidgetRO,
            Realm.UpdateMode.All
          );
        }

        if (chatDbUtil.isNull(conversation?.deletedByUserId)) {
          const members: any = realm.objects<MemberRO>(MemberRO.schema.name).filtered(`id = "${conversation?.deletedByUserId}"`)
          conversation.deletedBy = 
            data?.userMeta[conversation?.deletedByUserId]?.id?.toString() ?? (members[0])?.id?.toString();
          conversation.deletedByMember =
            data?.userMeta[conversation?.deletedByUserId] ?? members[0] ?? null;
        }

        if ((conversation?.replyId || conversation?.replyConversation)) {
          const conversations = realm.objects<Conversation>(
            ConversationRO.schema.name
          );
          const savedRepliedConversation = conversations.filtered(
            `id = "${conversation?.replyId || conversation?.replyConversation}"`
          );

          const replyConversationObject =
            savedRepliedConversation.map<Conversation>((item) => {
              const stringifiedConversation = JSON.stringify(item);
              return {
                ...JSON.parse(stringifiedConversation),
              };
            });

          if (conversation) {
            if (!conversation.replyConversationObject) {
              conversation.replyConversationObject =
                savedRepliedConversation?.length > 0
                  ? replyConversationObject[0]
                  : data?.conversationMeta[conversation?.replyId || conversation?.replyConversation];
            }
          }

          const replyConversationWidget = conversation?.replyConversationObject
            ?.widgetId
            ? data.widgets[conversation?.replyConversationObject?.widgetId] ?? Object.keys(widgets ?? {})?.length > 0 ? widgets[conversation?.replyConversationObject?.widgetId] : null
            : null;

          let replyConversationWidgetRO;
          if (Object.keys(replyConversationWidget || {}).length > 0) {
            replyConversationWidgetRO = convertToWidget(
              conversation.replyConversationObject.widgetId,
              replyConversationWidget
            );
            realm.create(
              WidgetRO.schema.name,
              replyConversationWidgetRO,
              Realm.UpdateMode.All
            );
          }
        }

        if (!conversationCreatorRO) return;
        realm.create(
          MemberRO.schema.name,
          conversationCreatorRO,
          Realm.UpdateMode.All
        );

        // save reactions on conversations
        const conversationReaction =
          conversation?.hasReactions === true
            ? data?.convReactionsMeta[conversation?.id?.toString()]
            : [];

        if (conversationReaction?.length) {
          const members = realm.objects<MemberRO>(MemberRO.schema.name)
          for (let i = 0; i < conversationReaction?.length; i++) {
            const member: any = members.filtered(`uid = "${conversationReaction[i]?.userId?.toString()}"`)
            const reactionCreator =
              conversation?.hasReactions === true &&
                conversationReaction?.length > 0
                ? data?.userMeta[conversationReaction[i]?.userId] ?? member[0]
                : null;
  
            if (reactionCreator !== null && conversationReaction?.length > 0) {
              conversationReaction[i].member = reactionCreator;
            }
          }
        }

        // save polls
        const conversationState = conversation?.state;
        const conversationPolls = chatDbUtil.isPoll(conversationState)
          ? data?.convPollsMeta[conversation?.id?.toString()]
            ??
            conversation?.polls
          : null;

        // save attachments
        const conversationAttachment =
          conversation?.attachmentCount > 0
            ? data?.convAttachmentsMeta[conversation?.id?.toString()] 
              ?? 
              conversation?.attachments
            : [];

        const Query = realm.objects<ConversationRO>(ConversationRO.schema.name);
        const matchingConversations: any = Query.filtered(`id = "-${conversation?.temporaryId?.toString()}"`);

        if (matchingConversations?.length) {
          const existingConversation = matchingConversations[0];
          // adding the timestamps to the conversations fetched from sync api
          if (existingConversation.localSavedEpoch) {
            conversation.localCreatedEpoch = existingConversation.localSavedEpoch;
          }

          if (existingConversation.attachmentUploadedEpoch) {
            conversation.attachmentUploadedEpoch = existingConversation.attachmentUploadedEpoch;
          }
        }


        // convert to ConversationRO
        const conversationRO = convertToConversationRO(
          realm,
          conversation,
          conversationCreatorRO,
          conversation?.cardId?.toString() ?? conversation?.chatroomId?.toString(),
          conversationWidgetRO,
          conversationAttachment,
          conversationPolls,
          conversationReaction
        );

        // save to local DB
        if (conversationRO) {
          realm.create(
            ConversationRO.schema.name,
            conversationRO,
            Realm.UpdateMode.All
          );
          if (matchingConversations?.length) {
            // delete the previous temporary conversation object
            realm.delete(matchingConversations)
          }
        }
      });
    });
  } finally {
    realm.close();
  }
}

// To get a single conversation data from realm
export async function getConversation(conversationId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const conversation = conversations.filtered(`id = "${conversationId}"`);
    const conversationObject = conversation.map((item) => {
      const stringifiedConversation = JSON.stringify(item);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });
    return conversationObject;
  } finally {
    realm.close();
  }
}

// To update a single conversation data in realm
export async function updateConversation(
  conversationId: string,
  data: Conversation
) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversation = realm
      .objects<ConversationRO>(ConversationRO.schema.name)
      .filtered(`id = "${conversationId}"`);

    realm.write(() => {
      conversation[0].answer = data?.answer;
      conversation[0].createdAt = data?.createdAt;
      conversation[0].isEdited = data?.isEdited;
    });
  } finally {
    realm.close();
  }
}

// To update deletedBy and deletedByMember of a conversation in realm
export async function updateDeletedBy(
  conversationId: string,
  data: Conversation
) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const conversations = realm.objects<ConversationRO>(
        ConversationRO.schema.name
      );
      const conversationObj = conversations.filtered(
        `id = "${conversationId}"`
      );
      conversationObj[0].deletedBy = data.deletedBy.toString();
      const memberRO = convertToMemberRO(
        data.deletedByMember,
        data.communityId
      );
      conversationObj[0].deletedByMember = memberRO;
    });
  } finally {
    realm.close();
  }
}

// To delete a single conversation data from realm
export async function deleteConversation(
  conversationId: string,
  user: Member,
  conversations: Conversation[],
  isChatroomTopic: boolean,
  chatroomId: string
) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversationFromRealm = await getConversation(conversationId);
    conversationFromRealm[0].deletedBy = user?.id;
    conversationFromRealm[0].deletedByMember = user;

    await updateDeletedBy(conversationId, conversationFromRealm[0]);

    for (let j = 0; j < conversations?.length; j++) {
      if (conversations[j].id == conversationFromRealm[0].id) {
        conversations[j] = conversationFromRealm[0];
        break;
      }
    }
    // deleteing chatroom topic from local db as well
    if (isChatroomTopic) {
      await deleteChatroomTopic(chatroomId);
    }
    return conversations;
  } finally {
    realm.close();
  }
}

export async function deleteConversationFromRealm(conversationId: string) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const conversation = conversations.filtered(`id = "${conversationId}"`);
    realm.write(() => {
      realm.delete(conversation);
    });
  } finally {
    realm.close();
  }
}

// To replace a conversation stored in realm to data recevied as response from an API call replacing the temporaryId with id
export async function replaceSavedConversation(
  data: Conversation,
  widgets?: Record<string, any>
) {
  const realm = new Realm(Db.getInstance());
  const chatDbUtil = new ChatDBUtil();
  try {
    const replyConv = data?.replyConversation;
    if (chatDbUtil.isNull(replyConv)) {
      const conversations = realm.objects(ConversationRO.schema.name);
      const conversation = conversations.filtered(`id = "${replyConv}"`);
      const stringifiedConversation = JSON.parse(JSON.stringify(conversation));
      data.replyConversationObject = stringifiedConversation[0];
    }

    realm.write(() => {
      const conversations = realm.objects(ConversationRO.schema.name);
      const allConversations: any = conversations.filtered(
        `chatroomId = "${data?.chatroomId}"`
      );

      const filteredConversation: any = allConversations.filtered(
        `id = "-${data?.temporaryId}"`
      );


      data.localCreatedEpoch = (filteredConversation[0])?.localSavedEpoch
      data.attachmentUploadedEpoch = (filteredConversation[0])?.attachmentUploadedEpoch

      const memberRO = convertToMemberRO(data?.member, data?.communityId);
      const conversationWidget = data.widgetId ? widgets[data.widgetId] : null;
      let conversationWidgetRO;
      if (Object.keys(conversationWidget || {}).length > 0) {
        conversationWidgetRO = convertToWidget(
          data.widgetId,
          conversationWidget
        );
      }

      const convertedConversation = convertToConversationRO(
        realm,
        data,
        memberRO,
        data?.chatroomId,
        conversationWidgetRO,
        filteredConversation[0]?.attachments,
        filteredConversation[0]?.polls,
        filteredConversation[0]?.reactions
      );

      realm.create(
        ConversationRO.schema.name,
        convertedConversation,
        Realm.UpdateMode.All
      );
      realm.delete(filteredConversation);
    });
  } finally {
    realm.close();
  }
}

export async function updateConversationData(
  updateConversationDataRequest: UpdateConversationDataRequest
) {
  const realm = new Realm(Db.getInstance());
  const chatDbUtil = new ChatDBUtil();
  const { conversation, widgets } = updateConversationDataRequest
  try {
    realm.write(() => {

      const replyConv = conversation?.replyConversation;
      if (chatDbUtil.isNull(replyConv)) {
        const conversations = realm.objects(ConversationRO.schema.name);
        const conversation: any = conversations.filtered(`id = "${replyConv}"`);
        const stringifiedConversation = JSON.parse(JSON.stringify(conversation));
        conversation.replyConversationObject = stringifiedConversation[0];
      }

      // query the conversation object with the matching temporaryId
      const filteredConversation: any = realm
        .objects<ConversationRO>(ConversationRO.schema.name)
        .filtered(`temporaryId = "${conversation?.temporaryId}"`);


      const memberRO = convertToMemberRO(conversation?.member, conversation?.communityId);
      const conversationWidget = conversation.widgetId ? widgets[conversation.widgetId] : null;
      let conversationWidgetRO;
      if (Object.keys(conversationWidget || {}).length > 0) {
        conversationWidgetRO = convertToWidget(
          conversation.widgetId,
          conversationWidget
        );
      }

      if (filteredConversation) {
        // create a realm object from the updated conversation
        const convertedConversation = convertToConversationRO(
          realm,
          conversation,
          memberRO,
          conversation?.chatroomId,
          conversationWidgetRO,
          filteredConversation[0]?.attachments,
          filteredConversation[0]?.polls,
          filteredConversation[0]?.reactions
        );
        // updating the timestamps in the existing conversation object in local db
        filteredConversation[0].localSavedEpoch = convertedConversation.localSavedEpoch
        filteredConversation[0].attachmentUploadedEpoch = convertedConversation.attachmentUploadedEpoch
      }
    })
  } finally {
    realm.close();
  }
}

export async function updatePollVotes(
  data: Conversation[],
  communityId: string
) {
  const realm = new Realm(Db.getInstance());
  try {
    const currentConversation = data[0];
    const conversation = realm
      .objects<ConversationRO>(ConversationRO.schema.name)
      .filtered(`id = "${currentConversation?.id}"`);

    const updatedPolls = currentConversation?.polls;

    const updatedPollsRO = convertToPoll(updatedPolls, communityId);

    realm.write(() => {
      conversation[0].polls = updatedPollsRO;
      conversation[0].pollAnswerText = currentConversation?.pollAnswerText;
    });
  } finally {
    realm.close();
  }
}

// saving a conversation in realm
export async function saveNewConversation(
  chatroomId: string,
  data: Conversation
) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const memberRO = convertToMemberRO(data?.member, data?.communityId);

      const conversationWidget = data.widget;
      let conversationWidgetRO;
      if (Object.keys(conversationWidget || {}).length > 0) {
        conversationWidgetRO = convertToWidget(
          data.widgetId,
          conversationWidget
        );
      }

      const conversationRO = convertToConversationRO(
        realm,
        data,
        memberRO,
        chatroomId,
        conversationWidgetRO,
        data?.attachments,
        data?.polls,
        data?.reactions
      );

      if (conversationRO) {
        realm.create(
          ConversationRO.schema.name,
          conversationRO,
          Realm.UpdateMode.All
        );
      }
      const chatroom = realm
        .objects<ChatroomRO>(ChatroomRO.schema.name)
        .filtered(`id = "${chatroomId}"`);

      chatroom[0].totalResponseCount = chatroom[0].totalResponseCount + 1;
      chatroom[0].totalAllResponseCount = chatroom[0].totalAllResponseCount + 1;
    });
  } finally {
    realm.close();
  }
}

export async function getConversations(
  getConversationsRequest: GetConversationsRequest
) {
  const realm = new Realm(Db.getInstance());
  const getFilterStateMessages = await getFilterConversationState(realm);
  try {
    const conversations = realm.objects<ConversationRO>(
      ConversationRO.schema.name
    );
    const filterStateQuery = getFilterStateMessages?.filterConversationState
      .map((state) => `(state != ${state})`)
      .join(" && ");

    const filteredConversations = conversations
      .filtered(
        `(chatroomId = "${getConversationsRequest?.medianConversation?.chatroomId}") && ${filterStateQuery}`
      )
      .sorted("createdEpoch", false);

    if (getConversationsRequest.type == GetConversationsType.ABOVE) {
      const currentConversationIndex = filteredConversations.findIndex(
        (val: ConversationRO) =>
          val?.id == getConversationsRequest?.medianConversation?.id
      );
      if (currentConversationIndex >= 0) {
        const aboveConversations = filteredConversations.slice(
          currentConversationIndex - getConversationsRequest?.limit,
          currentConversationIndex
        );
        const conversationObject = aboveConversations.map((conversation) => {
          const stringifiedConversation = JSON.stringify(conversation);
          return {
            ...JSON.parse(stringifiedConversation),
          };
        });
        return conversationObject;
      }
      return [];
    } else if (getConversationsRequest.type == GetConversationsType.BELOW) {
      const currentConversationIndex = filteredConversations.findIndex(
        (val: ConversationRO) =>
          val?.id == getConversationsRequest?.medianConversation?.id
      );
      if (currentConversationIndex >= 0) {
        const belowConversations = filteredConversations.slice(
          currentConversationIndex + 1,
          currentConversationIndex + getConversationsRequest?.limit + 1
        );
        const conversationObject = belowConversations.map((conversation) => {
          const stringifiedConversation = JSON.stringify(conversation);
          return {
            ...JSON.parse(stringifiedConversation),
          };
        });
        return conversationObject;
      }
      return [];
    } else {
      if (getConversationsRequest.medianConversation?.createdEpoch)
        return paginateUp(
          realm,
          getConversationsRequest.chatroomId,
          getConversationsRequest.medianConversation?.createdEpoch,
          getConversationsRequest.limit
        );
      const conversations = realm.objects(ConversationRO.schema.name);
      const filteredConversations = conversations
        .filtered(
          `chatroomId = "${getConversationsRequest.chatroomId}" && ${filterStateQuery}`
        )
        .sorted("createdEpoch", true)
        .slice(0, getConversationsRequest.limit);
      const conversationObject = filteredConversations.map((conversation) => {
        const stringifiedConversation = JSON.stringify(conversation);
        return {
          ...JSON.parse(stringifiedConversation),
        };
      });

      return conversationObject;
    }
  } finally {
    realm.close();
  }
}

export async function paginateDown(
  realm: Realm,
  chatroomId: string,
  conversation: Conversation,
  pageSize: number
) {
  const conversations = realm.objects<ConversationRO>(
    ConversationRO.schema.name
  );
  const allConversations = conversations
    .filtered(`chatroomId = "${chatroomId}"`)
    .sorted("createdEpoch", true);

  const index = allConversations.findIndex(
    (val: ConversationRO) => val?.id == conversation?.id
  );

  let filteredConversation = allConversations.slice(0, index);
  filteredConversation = filteredConversation.reverse();
  const finalConversationObject = filteredConversation.slice(0, pageSize);

  const conversationObject = finalConversationObject.map((conversation) => {
    const stringifiedConversation = JSON.stringify(conversation);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });

  return conversationObject;
}

export async function paginateUp(
  realm: Realm,
  chatroomId: string,
  createdEpoch: number,
  pageSize: number
) {
  const conversations = realm.objects(ConversationRO.schema.name);
  const filteredConversations = conversations
    .filtered(`chatroomId = "${chatroomId}" AND createdEpoch < ${createdEpoch}`)
    .sorted("createdEpoch", true)
    .slice(0, pageSize);

  const conversationObject = filteredConversations.map((conversation) => {
    const stringifiedConversation = JSON.stringify(conversation);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });

  return conversationObject;
}

// to replace the temporary attachment with updated attachment inside a conversation
export async function updateAttachment(updateAttachmentRequest: UpdateAttachmentRequest) {
  const realm = new Realm(Db.getInstance());
  const chatDbUtil = new ChatDBUtil();
  const { conversationID, attachment } = updateAttachmentRequest
  try {
    realm.write(() => {
      const filteredConversation: any = realm
        .objects<ConversationRO>(ConversationRO.schema.name)
        .filtered(`id = "${conversationID}"`);

      const filteredAttachmentIndex = filteredConversation[0]?.attachments?.findIndex(
        attachmentObject => {
          if (attachmentObject?.index == attachment?.index) {
            return true;
          }
        }
      )

      // replace the older attachment in the conversation object
      if (filteredConversation[0]) {
        filteredConversation[0].attachments[filteredAttachmentIndex] = attachment
      }

    })
  } finally {
    realm.close();
  }
}
