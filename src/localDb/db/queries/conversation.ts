import { Conversation } from "src/shared/responseModels/Conversation";
import { CommunityRO } from "../../models/CommunityRO";
import { ConversationRO } from "../../models/ConversationRO";
import { MemberRO } from "../../models/MemberRO";
import {
  convertToCommunity,
  convertToMemberRO,
  convertToConversationRO,
  convertToLastConversationRO,
  convertToChatroomRO,
} from "../ROConverter";
import Db from "../db";
import Realm from "realm";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { SyncConversationResponse } from "src/sync/model/syncConversationResponse";
import ChatDBUtil from "src/localDb/utils/chatDbUtils";
import { updateDeletedBy } from "./functionalities";
import { Member } from "src/shared/responseModels/Member";
import { ChatroomRO } from "src/localDb/models/ChatroomRO";

export async function saveConversationData(
  realm: Realm,
  data: SyncConversationResponse,
  chatroomData: Chatroom[],
  conversationData: Conversation[],
  communityId: string
) {
  const chatDbUtil = new ChatDBUtil();
  realm.write(() => {
    // save community
    const community = data?.communityMeta[communityId];
    console.log("123", community);

    if (!community) return;
    console.log("1234");
    const communityRO = convertToCommunity(community);
    console.log("1235", communityRO);
    if (!communityRO) return;
    console.log("1236");
    realm.create(CommunityRO.schema.name, communityRO, Realm.UpdateMode.All);
    console.log("1237");
    // save chatroom
    const chatroomId = Object.keys(chatroomData);
    console.log("1238", chatroomId);

    const chatroom = chatroomData[chatroomId[0]];
    console.log("1239", chatroom);
    const creatorId = chatroom?.userId;
    console.log("123098", creatorId);
    const creator = data?.userMeta[creatorId?.toString()];
    console.log("324", creator);
    if (!creator) return;
    const conversationCreatorRO = convertToMemberRO(creator, communityId);
    console.log("conversationCreatorRO", conversationCreatorRO);

    // const lastSeenConversationId = chatroom.lastSeenConversationId;
    // console.log("lastSeenConversationId", lastSeenConversationId);
    // let lastSeenConversation = conversationData.filter((item) => {
    //   return item?.id == lastSeenConversationId;
    // });
    // // conversationData[lastSeenConversationId?.toString()];
    // console.log("lastSeenConversation", lastSeenConversation);
    // console.log("conversationData098765", conversationData);

    // let lastSeenConversationRO = undefined;

    // if (!lastSeenConversation) {
    //   console.log("897654");

    //   // get single conversation
    //   const conversations = realm.objects(ConversationRO.schema.name);
    //   const conversation = conversations.filtered(
    //     `id = "${lastSeenConversationId}"`
    //   );
    //   const singleConversation: Conversation = conversation.map((item) => {
    //     const stringifiedConversation = JSON.stringify(item);
    //     return {
    //       ...JSON.parse(stringifiedConversation),
    //     };
    //   })[0];

    //   if (singleConversation) {
    //     const lastSeenConversationCreatorRO = convertToMemberRO(
    //       singleConversation?.member,
    //       singleConversation?.communityId
    //     );

    //     const lastSeenConversationDeletedByMemberRO = !!lastSeenConversation[0]
    //       ?.deletedBy
    //       ? convertToMemberRO(
    //           data.userMeta[lastSeenConversation[0]?.deletedBy],
    //           communityId
    //         )
    //       : null;

    //     let lastSeenConversationRO = convertToLastConversationRO(
    //       singleConversation,
    //       lastSeenConversationCreatorRO,
    //       singleConversation?.chatroomId?.toString(),
    //       singleConversation?.attachments,
    //       lastSeenConversationDeletedByMemberRO
    //     );

    //     if (lastSeenConversationRO) {
    //       realm.create(
    //         ConversationRO.schema.name,
    //         lastSeenConversationRO,
    //         Realm.UpdateMode.All
    //       );
    //     }
    //   }
    // }

    // if (lastSeenConversationId && lastSeenConversation) {
    //   const lastSeenConversationCreator =
    //     data.userMeta[lastSeenConversation[0]?.userId?.toString()];

    //   const lastSeenConversationCreatorRO = convertToMemberRO(
    //     lastSeenConversationCreator,
    //     communityId
    //   );

    //   const lastSeenConversationDeletedByMemberRO = !!lastSeenConversation[0]
    //     ?.deletedBy
    //     ? convertToMemberRO(
    //         data.userMeta[lastSeenConversation[0]?.deletedBy],
    //         communityId
    //       )
    //     : null;

    //   const lastSeenConversationPolls = chatDbUtil.isPoll(
    //     lastSeenConversation[0]?.state || 0
    //   )
    //     ? (data?.convPollsMeta[lastSeenConversationId?.toString()] || []).map(
    //         (poll: any) => {
    //           let pollObject = { ...poll };
    //           const user = data?.userMeta[poll.userId];
    //           pollObject.member = user;
    //           return pollObject;
    //         }
    //       )
    //     : null;

    //   const lastSeenConversationAttachments =
    //     lastSeenConversation[0]?.attachmentCount > 0
    //       ? data.convAttachmentsMeta[lastSeenConversationId?.toString()]
    //       : [];

    //   lastSeenConversationRO = convertToLastConversationRO(
    //     lastSeenConversation[0],
    //     lastSeenConversationCreatorRO,
    //     chatroom?.id,
    //     lastSeenConversationAttachments,
    //     lastSeenConversationDeletedByMemberRO
    //   );

    //   console.log("lastSeenConversationROConverter", lastSeenConversationRO);

    //   if (lastSeenConversationRO) {
    //     console.log("645321");

    //     realm.create(
    //       ConversationRO.schema.name,
    //       lastSeenConversationRO,
    //       Realm.UpdateMode.All
    //     );
    //     console.log("134t32");
    //   }
    //   if (lastSeenConversationCreatorRO) {
    //     realm.create(
    //       MemberRO.schema.name,
    //       lastSeenConversationCreatorRO,
    //       Realm.UpdateMode.All
    //     );
    //   }
    // }

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
      console.log("02398ewui", conversation);

      // save conversation creator
      const creatorId = conversation?.userId;
      console.log("02398ewwqeui", creatorId);
      const creator = data?.userMeta[creatorId?.toString()];
      console.log("0239wqed8ewui", creator);
      if (!creator) return;
      const conversationCreatorRO = convertToMemberRO(creator, communityId);
      console.log("0239asd8ewui", conversationCreatorRO);

      console.log("0239asd8easdasdwui", conversationCreatorRO);

      console.log("afasdasdsa", conversation?.deletedByUserId);

      if (
        conversation?.deletedByUserId !== null &&
        conversation?.deletedByUserId !== "null"
      ) {
        conversation.deletedBy =
          data?.userMeta[conversation?.deletedByUserId]?.id?.toString();
        conversation.deletedByMember =
          data?.userMeta[conversation?.deletedByUserId];
      }

      console.log("3243546");

      if (conversation?.replyId !== null && conversation?.replyId !== "null") {
        const conversations = realm.objects(ConversationRO.schema.name);
        const conversationToBeReplied = conversations.filtered(
          `id = "${conversation.replyId}"`
        );

        const stringifiedConversation = JSON.stringify(conversationToBeReplied);
        const parsedReplyConversation = JSON.parse(stringifiedConversation);

        console.log("parsedReplyConversation", parsedReplyConversation);

        if (conversationToBeReplied?.length !== 0) {
          conversation.replyConversationObject = parsedReplyConversation[0];
        }
      }

      if (!conversationCreatorRO) return;
      realm.create(
        MemberRO.schema.name,
        conversationCreatorRO,
        Realm.UpdateMode.All
      );

      console.log("23243231");

      // save reactions on conversations
      const conversationReaction =
        conversation?.hasReactions === true
          ? data?.convReactionsMeta[conversation?.id?.toString()]
          : [];
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
      console.log("324354tr", conversationRO?.chatroomId);

      // save to local DB
      if (conversationRO) {
        console.log("3423");
        realm.create(
          ConversationRO.schema.name,
          conversationRO,
          Realm.UpdateMode.All
        );
        console.log("3245423r");
      }
    });
  });
}

// export async function saveSingleConversation(
//   realm: Realm,
//   conversation: Conversation,
//   communityId: string
// ) {
//   realm.write(() => {
//     const member = conversation?.member;
//     const memberRO = convertToMemberRO(member, communityId);
//     const conversationRO = convertToConversationRO(
//       conversation,
//       memberRO,
//       conversation?.chatroomId?.toString()
//     );
//     if (conversationRO) {
//       realm.create(
//         ConversationRO.schema.name,
//         conversationRO,
//         Realm.UpdateMode.All
//       );
//     }
//   });
// }

// To get a all conversations data of a single chatroom from realm
export async function getConversations(realm: Realm, chatroomId: string) {
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
export async function getConversation(realm: Realm, conversationId: string) {
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
  realm: Realm,
  conversationId: string,
  data: Conversation
) {
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
  realm: Realm,
  conversationId: string,
  user: Member,
  conversations: Conversation[]
) {
  const conversationFromRealm = await getConversation(realm, conversationId);
  conversationFromRealm[0].deletedBy = user?.id;
  conversationFromRealm[0].deletedByMember = user;

  await updateDeletedBy(realm, conversationId, conversationFromRealm[0]);

  for (let j = 0; j < conversations.length; j++) {
    if (conversations[j].id == conversationFromRealm[0].id) {
      conversations[j] = conversationFromRealm[0];
      break;
    }
  }
  return conversations;
}

// To replace a conversation stored in realm to data recevied as response from an API call replacing the temporaryId with id
export async function replaceSavedConversation(
  realm: Realm,
  data: Conversation
) {
  const replyConv = data?.replyConversation;
  if (replyConv !== null && replyConv !== "null") {
    const conversation = await getConversation(realm, replyConv);
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
      realm,
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
  realm: Realm,
  chatroomId: string,
  data: Conversation
) {
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

    realm.create(
      ConversationRO.schema.name,
      conversationRO,
      Realm.UpdateMode.All
    );
  });
}

export async function getConversationData(
  realm: Realm,
  chatroomId: string,
  pageSize: number
) {
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
