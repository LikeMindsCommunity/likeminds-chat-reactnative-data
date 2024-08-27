import { TOKENS_ID, USER_SCHEMA_ID } from "src/localDb/constants";
import Db from "../db";
import { TokenSchemaRO } from "src/localDb/models/TokenSchemaRO";

export const setTokensInRealm = (accessToken: string, refreshToken: string) => {
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    realm.create(
      TokenSchemaRO.schema.name,
      {
        id: TOKENS_ID,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      Realm.UpdateMode.All
    );
  });
};

export const getTokensFromRealm = () => {
  const realm = new Realm(Db.getInstance());
  const users = realm.objects<TokenSchemaRO>(TokenSchemaRO.schema.name);
  const serializedData = JSON.parse(JSON.stringify(users));
  return serializedData[0];
};
