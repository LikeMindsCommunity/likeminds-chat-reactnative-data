import Realm from "realm";
import { AppConfigRO } from "../models/AppConfigRO";
import { CommunityRO } from "../models/CommunityRO";
import { ChatroomRO } from "../models/ChatroomRO";
import { ConversationRO } from "../models/ConversationRO";
import Db from "../db/db";

class ChatDBUtil {
  private static ONGOING_WRITE_TRANSACTION = 0;

  // method to check for poll
  isPoll(state: number) {
    return state == 10;
  }

  static writeAsync(
    block: (realm: Realm) => void,
    cb: ((isSuccess: boolean) => void) | null = null
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      Realm.open(Db.getInstance()).then((realm) => {
        ChatDBUtil.write(realm, block);
        if (cb) {
          cb(true);
        }
        realm.close();
        resolve();
      });
    });
  }

  static write(realm: Realm, block: (realm: Realm) => void): boolean {
    ChatDBUtil.ONGOING_WRITE_TRANSACTION++;
    try {
      realm.write(() => {
        block(realm);
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      ChatDBUtil.ONGOING_WRITE_TRANSACTION--;
    }
  }

  static isEmpty(): boolean {
    const realm = Db.getInstance();
    if (realm.isEmpty) {
      return true;
    }
    const query = realm.objectForPrimaryKey<AppConfigRO>(AppConfigRO, 0);
    return (
      !query?.isConversationsSynced &&
      !query?.isChatroomsSynced &&
      !query?.isCommunitiesSynced
    );
  }

  static getAppConfig(realm: Realm): AppConfigRO | null {
    const query = realm.objectForPrimaryKey<AppConfigRO>(AppConfigRO, 0);
    return query || null;
  }

  static getCommunity(
    realm: Realm,
    communityId: string | null
  ): CommunityRO | null {
    if (!communityId) {
      return null;
    }
    const query = realm.objectForPrimaryKey<CommunityRO>(
      CommunityRO,
      communityId
    );
    return query || null;
  }

  static getChatroom(
    realm: Realm,
    chatroomId: string | null
  ): ChatroomRO | null {
    if (!chatroomId) {
      return null;
    }
    const query = realm.objectForPrimaryKey<ChatroomRO>(ChatroomRO, chatroomId);
    return query || null;
  }

  static getConversation(
    realm: Realm,
    conversationId: string | null
  ): ConversationRO | null {
    if (!conversationId) {
      return null;
    }
    const query = realm.objectForPrimaryKey<ConversationRO>(
      ConversationRO,
      conversationId
    );
    return query || null;
  }

  static getCommunityConversations(
    realm: Realm,
    communityId: string
  ): Realm.Results<ConversationRO> {
    return realm
      .objects<ConversationRO>(ConversationRO)
      .filtered(`communityId = "${communityId}"`);
  }

  static getChatroomConversations(
    realm: Realm,
    chatroomId: string
  ): Realm.Results<ConversationRO> {
    return realm
      .objects<ConversationRO>(ConversationRO)
      .filtered(`chatroomId = "${chatroomId}"`);
  }

  static updateIsConversationStoreForChatroom(
    chatroomId: string,
    isConversationStored: boolean
  ): void {
    const realm = Db.getInstance();
    realm.write(() => {
      const chatroomRO = ChatDBUtil.getChatroom(realm, chatroomId);
      if (chatroomRO) {
        chatroomRO.isConversationStored = isConversationStored;
      }
    });
  }
}

export default ChatDBUtil;
