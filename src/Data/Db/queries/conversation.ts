import { CommunityRO } from "../../Models/CommunityRO";
import { ConversationRO } from "../../Models/ConversationRO";
import { MemberRO } from "../../Models/MemberRO";
import {
  convertToCommunity,
  convertToMemberRO,
  convertToConversationRO,
} from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// method to check for poll
function isPoll(state: number) {
  return state === 10;
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
        const chatroomCreatorRO = convertToMemberRO(creator, communityId);
        if (!chatroomCreatorRO) return;
        // realmWrite.insertOrUpdate(chatroomCreatorRO);
        realm.create(
          MemberRO.schema.name,
          chatroomCreatorRO,
          Realm.UpdateMode.All
        );
      });
      // save conversations
      for (const entryId in conversationData) {
        if (conversationData.hasOwnProperty(entryId)) {
          const conversation = conversationData[entryId];
          // save conversation creator
          const creatorId = conversation?.userId;
          const creator = data.userMeta[creatorId?.toString()];
          if (!creator) return;
          const chatroomCreatorRO = convertToMemberRO(creator, communityId);
          if (!chatroomCreatorRO) return;
          realm.create(
            MemberRO.schema.name,
            chatroomCreatorRO,
            Realm.UpdateMode.All
          );
          // save reactions on conversations
          const conversationReaction =
            conversation.hasReactions === true
              ? data.convReactionsMeta[conversation?.id?.toString()]
              : [];
          // save polls
          const conversationState = conversation?.state;
          const conversationPolls = isPoll(conversationState?.state || 0)
            ? (data.convPollsMeta[conversation?.id?.toString()] || [])
                .sort((a: any, b: any) => a.id - b.id)
                .map((poll: any) => {
                  const user = data.userMeta[poll.userId];
                  return poll.toBuilder().member(user).build();
                })
            : null;
          // save attachments
          const conversationAttachment =
            conversation.attachmentCount > 0
              ? data.convAttachmentsMeta[conversation?.id?.toString()]
              : [];
          // convert to ConversationRO
          const conversationRO = convertToConversationRO(
            conversation,
            chatroomCreatorRO,
            conversationData[entryId]?.cardId?.toString(),
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
    //TODO
    // realm.close(); // Close the Realm instance after the write operation
  });
}
export async function saveConversationData(
  data: any,
  chatroomData: any[],
  conversationData: any[],
  communityId: any
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
      const chatroomCreatorRO = convertToMemberRO(creator, communityId);
      if (!chatroomCreatorRO) return;
      // realmWrite.insertOrUpdate(chatroomCreatorRO);
      realm.create(
        MemberRO.schema.name,
        chatroomCreatorRO,
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
      const chatroomCreatorRO = convertToMemberRO(creator, communityId);
      if (!chatroomCreatorRO) return;
      realm.create(
        MemberRO.schema.name,
        chatroomCreatorRO,
        Realm.UpdateMode.All
      );

      // save reactions on conversations
      const conversationReaction =
        conversation.hasReactions === true
          ? data.convReactionsMeta[conversation?.id?.toString()]
          : [];
      // save polls
      const conversationState = conversation?.state;
      const conversationPolls = isPoll(conversationState?.state || 0)
        ? (data.convPollsMeta[conversation?.id?.toString()] || [])
            .sort((a: any, b: any) => a.id - b.id)
            .map((poll: any) => {
              const user = data.userMeta[poll.userId];
              return poll.toBuilder().member(user).build();
            })
        : null;

      // save attachments
      const conversationAttachment =
        conversation.attachmentCount > 0
          ? data.convAttachmentsMeta[conversation?.id?.toString()]
          : [];

      // convert to ConversationRO
      const conversationRO = convertToConversationRO(
        conversation,
        chatroomCreatorRO,
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
  //TODO
  // realm.close(); // Close the Realm instance after the write operation
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

  //TODO
  // realm.close(); // Close the Realm instance after reading data

  return coonversationObject;
}

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
  //TODO
  // realm.close(); // Close the Realm instance after reading data
  return conversationObject;
}

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
  //TODO
  // realm.close(); // Close the Realm instance after reading data
  return conversationObject;
}

export async function updateSingleConversation(
  conversationId: string,
  data: any
) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const conversationObj = conversations.filtered(`id = "${conversationId}"`);
  const conversation = data?.data?.conversation;
  const temp1 = JSON.stringify(conversation);
  let parsedConversation = JSON.parse(temp1);
  const keys = Object.keys(parsedConversation);
  const temp: any = conversationObj[0];
  const sdkClientInfo = conversation?.member?.sdkClientInfo;
  const community = sdkClientInfo?.community.toString();
  const user = sdkClientInfo?.user.toString();
  const editedSDkClinetInfo = {
    ...sdkClientInfo,
    community: community,
    user: user,
  };
  const member = conversation?.member;
  const id = member?.id.toString();
  const editedMember = {
    ...member,
    sdkClientInfo: editedSDkClinetInfo,
    id: id,
  };
  realm.write(() => {
    for (let i = 0; i < keys.length; i++) {
      if (temp[keys[i]] != undefined) {
        if (typeof temp[keys[i]] == "string") {
          temp[keys[i]] = parsedConversation[keys[i]].toString();
        } else if (keys[i] == "member") {
          temp[keys[i]] = editedMember;
        } else {
          temp[keys[i]] = parsedConversation[keys[i]];
        }
      }
    }
  });
}

export async function deleteSingleConversation(conversationId: string) {
  const realm = await Realm.open(Db.getInstance());
  const conversations = realm.objects(ConversationRO.schema.name);
  const conversation: any = conversations.filtered(`id = "${conversationId}"`);
  realm.write(() => {
    conversation[0].deletedBy = true;
  });
}

export async function replaceSavedConversation(data: any) {
  const realm = await Realm.open(Db.getInstance());
  const replyConv = data?.conversation?.replyConversation;
  if (replyConv !== null && replyConv !== "null") {
    const getConv = await getSingleConversationData(replyConv);
    data.conversation.replyConversationObject = getConv[0];
  }

  realm.write(() => {
    const conversations = realm.objects(ConversationRO.schema.name);
    const allConversations: any = conversations.filtered(
      `chatroomId = "${data?.conversation?.chatroomId}"`
    );

    let newCOnv: any = allConversations.filtered(
      `id = "${data?.conversation?.temporaryId}"`
    );

    const temp = convertToMemberRO(
      data?.conversation?.member,
      data?.conversation?.communityId
    );
    const convvvv = convertToConversationRO(
      data?.conversation,
      temp,
      data?.conversation?.chatroomId,
      newCOnv[0]?.attachments,
      newCOnv[0]?.polls
    );
    realm.create(ConversationRO.schema.name, convvvv, Realm.UpdateMode.All);
    realm.delete(newCOnv);
  });
}

export async function saveNewConversationToRealm(
  chatroomId: string,
  data: any
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    const conversations = realm.objects(ConversationRO.schema.name);
    let allConversations: any = conversations.filtered(
      `chatroomId = "${chatroomId}"`
    );
    const memberRo = convertToMemberRO(data?.member, data?.communityId);
    const newConvRO = convertToConversationRO(
      data,
      memberRo,
      chatroomId,
      data?.attachments,
      data?.polls,
      data?.reactions
    );
    allConversations = [newConvRO, ...allConversations];
    realm.create(ConversationRO.schema.name, newConvRO, Realm.UpdateMode.All);
  });
}
