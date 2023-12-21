import { USER_SCHEMA_RO } from "../constants";
import { ConversationRO } from "../models/ConversationRO";
import { UserSchemaRO } from "../models/UserSchemaRO";

export const realmDbMigration = (oldVersion: Realm, newVersion: Realm) => {
  let oldSchemaVersion = oldVersion.schemaVersion;
  if (oldSchemaVersion == 1) {
    const oldObjects = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );
    // Perform the migration by iterating through existing objects and setting the new property
    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, ogTags: null };
      newVersion.create(ConversationRO.schema.name, newObject);
    }
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 2) {
    // Initialise new schema
    newVersion.create(USER_SCHEMA_RO, UserSchemaRO.schema.properties);
    oldVersion._updateSchema(newVersion.schema);

    // Increment schema version
    oldSchemaVersion++;
  }
};

export const DB_SCHEMA_NAME = "likeminds-chat-sdk-rn";
export const DB_SCHEMA_VERSION = 3;
