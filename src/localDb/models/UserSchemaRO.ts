import { ID, OPTIONAL_STRING, STRING, USER_SCHEMA_RO } from "../constants";

export class UserSchemaRO extends Realm.Object<UserSchemaRO> {
  id!: string;
  userUniqueID!: string;
  userName!: string;
  apiKey?: string;

  static schema = {
    name: USER_SCHEMA_RO,
    properties: {
      id: STRING,
      userUniqueID: STRING,
      userName: STRING,
      apiKey: OPTIONAL_STRING,
    },
    primaryKey: ID,
  };
}
