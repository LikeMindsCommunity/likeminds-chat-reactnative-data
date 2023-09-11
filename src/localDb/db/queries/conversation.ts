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

// method to check for poll
function isPoll(state: number) {
  return state == 10;
}

export function saveLastConversationData(
  data: any,
  chatroomData: any[],
  conversationData: any[],
  communityId: any
) {
  return Realm.open(Db.getInstance()).then((realm) => {
    realm.write(() => {
      // save community
      const community = data.communityMeta[communityId];
      if (!community) return;
      const communityRO = convertToCommunity(community);
      if (!communityRO) return;
      realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);
      // save chatroom
      chatroomData.forEach((chatroom) => {
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
      });
      // save conversations
      for (const individualConversation in conversationData) {
        if (conversationData.hasOwnProperty(individualConversation)) {
          const conversation = conversationData[individualConversation];
          // save conversation creator
          const creatorId = conversation?.userId;
          const creator = data.userMeta[creatorId?.toString()];
          if (!creator) return;
          const conversationCreatorRO = convertToMemberRO(creator, communityId);
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

          const conversationPolls = isPoll(conversationState)
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
            conversationData[individualConversation]?.cardId?.toString(),
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
        }
      }
    });
  });
}

export async function saveConversationData(
  data: SyncConversationResponse,
  chatroomData: Chatroom[],
  conversationData: Conversation[],
  communityId: string
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    // save community
    const community = data.communityMeta[communityId];
    if (!community) return;
    const communityRO = convertToCommunity(community);
    if (!communityRO) return;
    realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);
    // save chatroom
    for (const chatroomID in chatroomData) {
      const chatroom = chatroomData[chatroomID];
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
    }
    // save conversations
    conversationData.map((item, index) => {
      const conversation = item;
      // save conversation creator
      const creatorId = conversation?.userId;
      const creator = data.userMeta[creatorId?.toString()];
      if (!creator) return;
      const conversationCreatorRO = convertToMemberRO(creator, communityId);
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
      const conversationPolls = isPoll(conversationState)
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

// To get conversation data from Realm
export async function getAllConversationData() {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const coonversationObject = conversations.map((conversation) => {
    const stringifiedConversation = JSON.stringify(conversation);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });

  return coonversationObject;
}

// To get a all conversations data of a single chatroom from realm
export async function getConversationData(chatroomId: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const chatroom = conversations.filtered(`chatroomId = "${chatroomId}"`);
  const conversationObject = chatroom.map((chatroom) => {
    const stringifiedConversation = JSON.stringify(chatroom);
    return {
      ...JSON.parse(stringifiedConversation),
    };
  });
  return conversationObject;
}

// To get a single conversation data from realm
export async function getSingleConversationData(conversationId: string) {
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
export async function updateSingleConversation(
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
  const community = sdkClientInfo?.community.toString();
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
export async function deleteSingleConversation(conversationId: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const conversation: any = conversations.filtered(`id = "${conversationId}"`);
  realm.write(() => {
    conversation[0].deletedBy = true;
  });
}

// To replace a conversation stored in realm to data recevied as response from an API call replacing the temporaryId with id
export async function replaceSavedConversation(data: Conversation) {
  const realm = await Realm.open(Db.getInstance());
  const replyConv = data?.replyConversation;
  if (replyConv !== null && replyConv !== "null") {
    const conversation = await getSingleConversationData(replyConv);
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
export async function saveNewConversationToRealm(
  chatroomId: string,
  data: Conversation
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    const memberRo = convertToMemberRO(data?.member, data?.communityId);

    const conversationRO = convertToConversationRO(
      data,
      memberRo,
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
