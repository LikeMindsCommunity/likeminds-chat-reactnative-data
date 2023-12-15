import Realm from "realm";
import { ChatroomRO } from "../models/ChatroomRO";
import { CommunityRO } from "../models/CommunityRO";
import { AppConfigRO } from "../models/AppConfigRO";
import { ConversationRO } from "../models/ConversationRO";
import { LastConversationRO } from "../models/LastConversationRO";
import { LinkRO } from "../models/LinkRO";
import { MemberRO } from "../models/MemberRO";
import { PollRO } from "../models/PollRO";
import { SDKClientInfoRO } from "../models/SDKClientInfoRO";
import { UserRO } from "../models/UserRO";
import { AttachmentMetaRO } from "../models/AttachmentMetaRO";
import { AttachmentRO } from "../models/AttachmentRO";
import { ReactionRO } from "../models/ReactionRO";
import { TimeStampRO } from "../models/TimeStampRO";
import { AttachmentUploadConversationsRO } from "../models/AttachmentUploadConversationRO";
import {
  DB_SCHEMA_NAME,
  DB_SCHEMA_VERSION,
  realmDbMigration,
} from "./realmDbMigration";
import { LinkOGTagsRO } from "../models/LinkOGTagsRO";
import { UserSchemaRO } from "../models/UserSchemaRO";

export default class Db {
  private static instance: Realm;

  private constructor() {}
  private static realmConfig: Realm.Configuration = {
    schema: [
      AppConfigRO,
      AttachmentMetaRO,
      AttachmentRO,
      ChatroomRO,
      CommunityRO,
      ConversationRO,
      LastConversationRO,
      LinkRO,
      MemberRO,
      PollRO,
      ReactionRO,
      SDKClientInfoRO,
      UserRO,
      TimeStampRO,
      AttachmentUploadConversationsRO,
      LinkOGTagsRO,
      UserSchemaRO
    ], // Update with your actual models
    schemaVersion: DB_SCHEMA_VERSION, // Increment when you change the schema
    onMigration: realmDbMigration,
    deleteRealmIfMigrationNeeded: false, // Set to true to delete the realm if schema needs migration
    inMemory: false, // Set to true to create an in-memory realm
    readOnly: false, // Set to true for read-only access
    path: DB_SCHEMA_NAME,
  };
  static getInstance() {
    return Db.realmConfig;
  }
}
