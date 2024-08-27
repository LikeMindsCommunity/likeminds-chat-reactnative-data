import { USER_SCHEMA_ID } from "src/localDb/constants";
import Db from "../db";
import { UserSchemaRO } from "src/localDb/models/UserSchemaRO";

export const setUserSchema = (userUniqueID: string, userName: string, apiKey: string) => {
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    realm.create(
      UserSchemaRO.schema.name,
      {
        id: USER_SCHEMA_ID,
        userUniqueID: userUniqueID,
        userName: userName,
        apiKey: apiKey
      },
      Realm.UpdateMode.All
    );
  });
};

export const getUserSchema = () => {
  const realm = new Realm(Db.getInstance());
  const users = realm.objects<UserSchemaRO>(UserSchemaRO.schema.name);
  const serializedData = JSON.parse(JSON.stringify(users));
  return serializedData[0];
};
