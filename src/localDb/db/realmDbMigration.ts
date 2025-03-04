import { TOKEN_SCHEMA_RO, USER_RO, USER_SCHEMA_RO } from "../constants";
import { ConversationRO } from "../models/ConversationRO";
import { UserSchemaRO } from "../models/UserSchemaRO";
import { APP_CONFIG, FILTER_CONVERSATION_STATE_RO } from "../constants";
import { AppConfigRO } from "../models/AppConfigRO";
import { FilterConversationStateRO } from "../models/FilterConversationStateRO";
import { TokenSchemaRO } from "../models/TokenSchemaRO";
import { UserRO } from "../models/UserRO";
import { AttachmentRO } from "../models/AttachmentRO";

export const realmDbMigration = (oldVersion: Realm, newVersion: Realm) => {
  let oldSchemaVersion = oldVersion.schemaVersion;
  if (oldSchemaVersion == 1) {
    const oldObjects = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );

    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, ogTags: null };
      newVersion.create(ConversationRO.schema.name, newObject);
    }

    // Increment schema version
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 2) {
    const oldObjects = oldVersion.objects<AppConfigRO>(AppConfigRO.schema.name);

    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, id: APP_CONFIG };
      newVersion.create(AppConfigRO.schema.name, newObject);
    }

    // Initialise new schema
    newVersion.create(
      FILTER_CONVERSATION_STATE_RO,
      FilterConversationStateRO.schema.properties
    );
    newVersion.create(USER_SCHEMA_RO, UserSchemaRO.schema.properties);
    oldVersion._updateSchema(newVersion.schema);

    // Increment schema version
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 3) {
    const oldObjects = oldVersion.objects<UserSchemaRO>(
      UserSchemaRO.schema.name
    );

    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, apiKey: "" };
      newVersion.create(UserSchemaRO.schema.name, newObject);
    }

    newVersion.create(TOKEN_SCHEMA_RO, TokenSchemaRO.schema.properties);
    oldVersion._updateSchema(newVersion.schema);

    // Increment schema version
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 4) {
    const userObjects = oldVersion.objects<UserRO>(UserRO.schema.name);
    const appConfigObjects = oldVersion.objects<AppConfigRO>(
      AppConfigRO.schema.name
    );

    for (let i = 0; i < userObjects.length; i++) {
      const oldObject = userObjects[i];
      const newObject = { ...oldObject, roles: "" };
      newVersion.create(UserRO.schema.name, newObject);
    }

    for (let i = 0; i < appConfigObjects.length; i++) {
      const oldObject = appConfigObjects[i];
      const newObject = {
        ...oldObject,
        chatroomIdWithAIChatbot: "",
      };
      newVersion.create(AppConfigRO.schema.name, newObject);
    }

    oldVersion._updateSchema(newVersion.schema);
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 5) {
    const conversationsRO = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );

    for (let i = 0; i < conversationsRO.length; i++) {
      const oldObject = conversationsRO[i];
      const newObject = { ...oldObject, widget: null, widgetId: "" };
      newVersion.create(ConversationRO.schema.name, newObject);
    }

    oldVersion._updateSchema(newVersion.schema);
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 6) {
    const conversations = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );
    for (let i = 0; i < conversations.length; i++) {
      const oldObject = conversations[i];
      const newObject = { ...oldObject, attachmentUploadedEpoch: null };
      newVersion.create(ConversationRO.schema.name, newObject);
    }

    const attachments = oldVersion.objects<AttachmentRO>(
      AttachmentRO.schema.name
    );
    for (let i = 0; i < attachments.length; i++) {
      const oldObject = attachments[i];
      const newObject = { ...oldObject, isUploaded: false };
      newVersion.create(AttachmentRO.schema.name, newObject);
    }

    oldVersion._updateSchema(newVersion.schema);
    oldSchemaVersion++;
  }
};

export const DB_SCHEMA_NAME = "likeminds-chat-sdk-rn";
export const DB_SCHEMA_VERSION = 7;
