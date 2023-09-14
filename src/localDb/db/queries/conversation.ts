import { Conversation } from "src/shared/responseModels/Conversation";
import { CommunityRO } from "../../models/CommunityRO";
import { ConversationRO } from "../../models/ConversationRO";
import { MemberRO } from "../../models/MemberRO";
import {
  convertToCommunity,
  convertToMemberRO,
  convertToConversationRO,
} from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { SyncConversationResponse } from "src/sync/model/syncConversationResponse";
import ChatDBUtil from "src/localDb/utils/chatDbUtils";
import { updateDeletedBy } from "./functionalities";
import { Member } from "src/shared/responseModels/Member";

export async function saveConversationData(
  data: SyncConversationResponse,
  chatroomData: Chatroom[],
  conversationData: Conversation[],
  communityId: string
) {
  const chatDbUtil = new ChatDBUtil();
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    // save community
    const community = data.communityMeta[communityId];
    if (!community) return;
    const communityRO = convertToCommunity(community);
    if (!communityRO) return;
    realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);

    // save chatroom
    const chatroomId = Object.keys(chatroomData);
    const chatroom = chatroomData[chatroomId[0]];
    const creatorId = chatroom.userId;
    const creator = data.userMeta[creatorId?.toString()];
    if (!creator) return;
    const conversationCreatorRO = convertToMemberRO(creator, communityId);
    if (!conversationCreatorRO) return;
    realm.create(
      MemberRO.schema.name,
      conversationCreatorRO,
      Realm.UpdateMode.All
    );
    // save conversations
    conversationData.map((item) => {
      const conversation = item;
      // save conversation creator
      const creatorId = conversation?.userId;
      const creator = data.userMeta[creatorId?.toString()];
      if (!creator) return;
      const conversationCreatorRO = convertToMemberRO(creator, communityId);

      if (conversation.deletedByUserId != null) {
        conversation.deletedBy =
          data?.userMeta[conversation.deletedByUserId].id.toString();
        conversation.deletedByMember =
          data?.userMeta[conversation.deletedByUserId];
      }

      if (conversation?.replyId !== null && conversation?.replyId !== "null") {
        const conversations = realm.objects(ConversationRO.schema.name);
        const conversationToBeReplied = conversations.filtered(
          `id = "${conversation.replyId}"`
        );

        const stringifiedConversation = JSON.stringify(conversationToBeReplied);
        const parsedReplyConversation = JSON.parse(stringifiedConversation);

        if (conversationToBeReplied.length !== 0) {
          conversation.replyConversationObject = parsedReplyConversation[0];
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
        conversation.hasReactions === true
          ? data.convReactionsMeta[conversation?.id?.toString()]
          : [];
      // save polls

      const conversationState = conversation?.state;
      const conversationPolls = chatDbUtil.isPoll(conversationState)
        ? data.convPollsMeta[conversation?.id?.toString()]
        : null;

      // save attachments
      const conversationAttachment =
        conversation.attachmentCount > 0
          ? data.convAttachmentsMeta[conversation?.id?.toString()]
          : [];

      // convert to ConversationRO
      const conversationRO = convertToConversationRO(
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
}

// To get a all conversations data of a single chatroom from realm
export async function getConversations(chatroomId: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const filteredAndSortedConversation = conversations
    .filtered(`chatroomId = "${chatroomId}"`)
    .sorted("createdEpoch", true);
  const conversationObject = filteredAndSortedConversation.map((chatroom) => {
    const stringifiedConversation = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });
  return conversationObject;
}

// To get a single conversation data from realm
export async function getConversation(conversationId: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const conversation = conversations.filtered(`id = "${conversationId}"`);
  const conversationObject = conversation.map((item) => {
    const stringifiedConversation = JSON.stringify(item);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });
  return conversationObject;
}

// To update a single conversation data in realm
export async function updateConversation(
  conversationId: string,
  data: Conversation
) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const filteredConversation = conversations.filtered(
    `id = "${conversationId}"`
  );

  const stringifiedConversation = JSON.stringify(data);
  let parsedConversation = JSON.parse(stringifiedConversation);
  const keys = Object.keys(parsedConversation);
  const conversationObject: any = filteredConversation[0];
  const sdkClientInfo = data?.member?.sdkClientInfo;
  const community = sdkClientInfo?.communityId.toString();
  const user = sdkClientInfo?.user.toString();
  const editedSDkClinetInfo = {
    ...sdkClientInfo,
    community: community,
    user: user,
  };
  const member = data?.member;
  const id = member?.id.toString();
  const editedMember = {
    ...member,
    sdkClientInfo: editedSDkClinetInfo,
    id: id,
  };
  realm.write(() => {
    for (let i = 0; i < keys.length; i++) {
      if (conversationObject[keys[i]] != undefined) {
        if (typeof conversationObject[keys[i]] == "string") {
          conversationObject[keys[i]] = parsedConversation[keys[i]].toString();
        } else if (keys[i] == "member") {
          conversationObject[keys[i]] = editedMember;
        } else {
          conversationObject[keys[i]] = parsedConversation[keys[i]];
        }
      }
    }
  });
}

// To delete a single conversation data from realm
export async function deleteConversation(
  conversationId: string,
  user: Member,
  conversations: Conversation[]
) {
  const conversationFromRealm = await getConversation(conversationId);
  conversationFromRealm[0].deletedBy = user?.id;
  conversationFromRealm[0].deletedByMember = user;

  await updateDeletedBy(conversationId, conversationFromRealm[0]);

  for (let j = 0; j < conversations.length; j++) {
    if (conversations[j].id == conversationFromRealm[0].id) {
      conversations[j] = conversationFromRealm[0];
      break;
    }
  }
  return conversations;
}

// To replace a conversation stored in realm to data recevied as response from an API call replacing the temporaryId with id
export async function replaceSavedConversation(data: Conversation) {
  const realm = await Realm.open(Db.getInstance());

  const replyConv = data?.replyConversation;
  if (replyConv !== null && replyConv !== "null") {
    const conversation = await getConversation(replyConv);
    data.replyConversationObject = conversation[0];
  }

  realm.write(() => {
    const conversations = realm.objects(ConversationRO.schema.name);
    const allConversations: any = conversations.filtered(
      `chatroomId = "${data?.chatroomId}"`
    );

    let filteredConversation: any = allConversations.filtered(
      `id = "${data?.temporaryId}"`
    );

    const memberRo = convertToMemberRO(data?.member, data?.communityId);

    const convertedConversation = convertToConversationRO(
      data,
      memberRo,
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
}

// saving a conversation in realm
export async function saveNewConversation(
  chatroomId: string,
  data: Conversation
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    const memberRO = convertToMemberRO(data?.member, data?.communityId);

    const conversationRO = convertToConversationRO(
      data,
      memberRO,
      chatroomId,
      data?.attachments,
      data?.polls,
      data?.reactions
    );

    realm.create(
      ConversationRO.schema.name,
      conversationRO,
      Realm.UpdateMode.All
    );
  });
}
