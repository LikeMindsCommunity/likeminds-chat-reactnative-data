import Realm from "realm";
import { TOKEN_SCHEMA_RO, ID, STRING } from "../constants";

export class TokenSchemaRO extends Realm.Object<TokenSchemaRO> {
  id!: string;
  accessToken!: string;
  refreshToken!: string;

  static schema: Realm.ObjectSchema = {
    name: TOKEN_SCHEMA_RO,
    properties: {
      id: STRING,
      accessToken: STRING,
      refreshToken: STRING,
    },
    primaryKey: ID,
  };
}