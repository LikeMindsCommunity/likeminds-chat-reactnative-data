import { ID, STRING, USER_SCHEMA_RO } from "../constants";

export class UserSchemaRO extends Realm.Object<UserSchemaRO> {
  id!: string;
  userUniqueID!: string;
  userName!: string;

  static schema = {
    name: USER_SCHEMA_RO,
    properties: {
      id: STRING,
      userUniqueID: STRING,
      userName: STRING,
    },
    primaryKey: ID,
  };
}
