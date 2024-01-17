import { convertToAppConfigRO } from "../ROConverter";
import Db from "../db";
import { AppConfigRO } from "src/localDb/models/AppConfigRO";

// Method to set isGroupFeedChatroomsSynced or isDmFeedChatroomsSynced based on isDm param
export async function setAppConfig(isDm: boolean) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const appConfig = realm.objects<AppConfigRO>(AppConfigRO.schema.name)[0];
      isDm
        ? (appConfig.isGroupFeedChatroomsSynced = true)
        : (appConfig.isDmFeedChatroomsSynced = true);
    });
  } finally {
    realm.close();
  }
}

// Method to get app config
export async function getAppConfig() {
  const realm = new Realm(Db.getInstance());
  try {
    const appConfig = realm.objects<AppConfigRO>(AppConfigRO.schema.name);
    const serializedData = JSON.parse(JSON.stringify(appConfig));
    return serializedData[0];
  } finally {
    realm.close();
  }
}

// Method to initiate app config by false
export async function initiateAppConfig() {
  const realm = new Realm(Db.getInstance());
  try {
    const appConfigRO = convertToAppConfigRO();
    realm.write(() => {
      realm.create(AppConfigRO.schema.name, appConfigRO, Realm.UpdateMode.All);
    });
  } finally {
    realm.close();
  }
}

// Method to clear local db
export async function clearDb() {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      realm.deleteAll();
    });
  } finally {
    realm.close();
  }
}
