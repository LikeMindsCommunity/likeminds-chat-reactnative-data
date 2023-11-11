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

export async function saveConversationData(
  data: SyncConversationResponse,
  chatroomData: Chatroom[],
  conversationData: Conversation[],
  communityId: string
) {
  const chatDbUtil = new ChatDBUtil();
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      // save community
      const community = data?.communityMeta[communityId];
      if (!community) return;
      const communityRO = convertToCommunity(community);
      if (!communityRO) return;
      realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

      // save chatroom
      const chatroomId = Object.keys(chatroomData);
      const chatroom = chatroomData[chatroomId[0]];
      const creatorId = chatroom?.userId;
      const creator = data?.userMeta[creatorId?.toString()];
      if (!creator) return;
      const conversationCreatorRO = convertToMemberRO(creator, communityId);

      if (!conversationCreatorRO) return;
      realm.create(
        MemberRO.schema.name,
        conversationCreatorRO,
        Realm.UpdateMode.All
      );

      const chatRequestedById = chatroom?.chatRequestedById;
      let chatRequestedByRO;
      if (chatRequestedById !== null) {
        const chatRequestedBy = data.userMeta[chatRequestedById?.toString()];
        chatRequestedByRO = convertToMemberRO(chatRequestedBy, communityId);
        if (chatRequestedByRO) {
          realm.create(
            MemberRO.schema.name,
            chatRequestedByRO,
            Realm.UpdateMode.All
          );
        }
      }

      const chatroomWithUserId = chatroom?.chatroomWithUserId;
      let chatroomWithUserRO;
      if (chatroomWithUserId !== null) {
        const chatroomWithUser = data.userMeta[chatroomWithUserId?.toString()];
        chatroomWithUserRO = convertToMemberRO(chatroomWithUser, communityId);
        if (chatroomWithUserRO) {
          realm.create(
            MemberRO.schema.name,
            chatroomWithUserRO,
            Realm.UpdateMode.All
          );
        }
      }

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

      // save conversations
      conversationData.map((item) => {
        const conversation = item;

        // save conversation creator
        const creatorId = conversation?.userId;
        const creator = data?.userMeta[creatorId?.toString()];
        if (!creator) return;
        const conversationCreatorRO = convertToMemberRO(creator, communityId);

        if (chatDbUtil.isNull(conversation?.deletedByUserId)) {
          conversation.deletedBy =
            data?.userMeta[conversation?.deletedByUserId]?.id?.toString();
          conversation.deletedByMember =
            data?.userMeta[conversation?.deletedByUserId];
        }

        if (chatDbUtil.isNull(conversation?.replyId)) {
          const repliedConversation =
            data?.conversationMeta[conversation?.replyId];

          const stringifiedConversation = JSON.parse(
            JSON.stringify(repliedConversation)
          );

          if (repliedConversation) {
            conversation.replyConversationObject = stringifiedConversation;
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

        for (let i = 0; i < conversationReaction?.length; i++) {
          const reactionCreator =
            conversation?.hasReactions === true &&
            conversationReaction?.length > 0
              ? data?.userMeta[conversationReaction[i]?.userId]
              : null;

          if (reactionCreator !== null && conversationReaction?.length > 0) {
            conversationReaction[i].member = reactionCreator;
          }
        }

        // save polls
        const conversationState = conversation?.state;
        const conversationPolls = chatDbUtil.isPoll(conversationState)
          ? data?.convPollsMeta[conversation?.id?.toString()]
          : null;

        // save attachments
        const conversationAttachment =
          conversation?.attachmentCount > 0
            ? data?.convAttachmentsMeta[conversation?.id?.toString()]
            : [];

        // convert to ConversationRO
        const conversationRO = convertToConversationRO(
          realm,
          conversation,
          conversationCreatorRO,
          conversation?.cardId?.toString(),
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
  conversations: Conversation[]
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
    return conversations;
  } finally {
    realm.close();
  }
}

// To replace a conversation stored in realm to data recevied as response from an API call replacing the temporaryId with id
export async function replaceSavedConversation(data: Conversation) {
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
        `id = "${data?.temporaryId}"`
      );

      const memberRO = convertToMemberRO(data?.member, data?.communityId);

      const convertedConversation = convertToConversationRO(
        realm,
        data,
        memberRO,
        data?.chatroomId,
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

      const conversationRO = convertToConversationRO(
        realm,
        data,
        memberRO,
        chatroomId,
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

export async function getPaginatedConversations(
  getConversationsRequest: GetConversationsRequest
) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(
        `chatroomId = "${getConversationsRequest?.medianConversation?.chatroomId}"`
      )
      .sorted("createdEpoch", false);

    if (getConversationsRequest.type == GetConversationsType.ABOVE) {
      const currentConversationIndex = filteredConversations.findIndex(
        (val: any) => val?.id == getConversationsRequest?.medianConversation?.id
      );
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
    } else if (getConversationsRequest.type == GetConversationsType.BELOW) {
      const currentConversationIndex = filteredConversations.findIndex(
        (val: any) => val?.id == getConversationsRequest?.medianConversation?.id
      );
      const belowConversations = filteredConversations.slice(
        currentConversationIndex + 1,
        currentConversationIndex + getConversationsRequest?.limit
      );
      const conversationObject = belowConversations.map((conversation) => {
        const stringifiedConversation = JSON.stringify(conversation);
        return {
          ...JSON.parse(stringifiedConversation),
        };
      });
      return conversationObject;
    } else {
      // TODO
      return getConversations(
        getConversationsRequest?.medianConversation?.chatroomId,
        getConversationsRequest?.limit
      );
    }
  } finally {
    realm.close();
  }
}

export async function getConversations(
  chatroomId: string,
  pageSize: number,
  createdEpoch?: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    if (!!createdEpoch) return paginateUp(chatroomId, createdEpoch, pageSize);
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(`chatroomId = "${chatroomId}"`)
      .sorted("createdEpoch", true)
      .slice(0, pageSize);
    const conversationObject = filteredConversations.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    return conversationObject;
  } finally {
    realm.close();
  }
}

export async function paginateDown(
  chatroomId: string,
  conversation: Conversation,
  pageSize: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const allConversations = conversations
      .filtered(`chatroomId = "${chatroomId}"`)
      .sorted("createdEpoch", true);

    console.log("allConversations", allConversations);

    const index = allConversations.findIndex(
      (val: any) => val?.id == conversation?.id
    );

    console.log("indexFound", index);

    let filteredConversation = allConversations.slice(0, index);
    console.log("filteredConversations", filteredConversation);
    filteredConversation = filteredConversation.reverse();
    const finalConv = filteredConversation.slice(0, pageSize);
    console.log("finalConv", finalConv);

    // console.log("allConversations", allConversations);

    // const filteredConversations = conversations
    //   .filtered(
    //     `chatroomId = "${chatroomId}" AND createdEpoch > ${createdEpoch}`
    //   )
    //   .sorted("createdEpoch", true);

    // console.log("filteredConversations", filteredConversations);
    // console.log("filteredConversationsLength", filteredConversations.length);

    // const finalConv = filteredConversations.slice(0, pageSize);
    // console.log("finalConv", finalConv);
    // console.log("finalConvLength", finalConv.length);

    const conversationObject = finalConv.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    console.log("conversationObject", conversationObject);
    console.log("conversationObjectLength", conversationObject.length);

    return conversationObject;
  } finally {
    realm.close();
  }
}

export async function paginateUp(
  chatroomId: string,
  createdEpoch: number,
  pageSize: number
) {
  const realm = new Realm(Db.getInstance());
  try {
    const conversations = realm.objects(ConversationRO.schema.name);
    const filteredConversations = conversations
      .filtered(
        `chatroomId = "${chatroomId}" AND createdEpoch < ${createdEpoch}`
      )
      .sorted("createdEpoch", true)
      .slice(0, pageSize);

    const conversationObject = filteredConversations.map((conversation) => {
      const stringifiedConversation = JSON.stringify(conversation);
      return {
        ...JSON.parse(stringifiedConversation),
      };
    });

    return conversationObject;
  } finally {
    realm.close();
  }
}
