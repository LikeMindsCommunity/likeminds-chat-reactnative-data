import { USER_SCHEMA_ID, USER_SCHEMA_RO } from "src/localDb/constants";
import Db from "../db";
import { UserSchemaRO } from "src/localDb/models/UserSchemaRO";

export const setUserSchema = (userUniqueID: string, userName: string) => {
  const realm = new Realm(Db.getInstance());
  realm.write(() => {
    realm.create(USER_SCHEMA_RO, {
      id: USER_SCHEMA_ID,
      userUniqueID: userUniqueID,
      userName: userName,
    });
  });
};

export const getUserSchema = () => {
  const realm = new Realm(Db.getInstance());
  const users = realm.objects<UserSchemaRO>(UserSchemaRO.schema.name);
  const serializedData = JSON.parse(JSON.stringify(users));
  return serializedData[0];
};
