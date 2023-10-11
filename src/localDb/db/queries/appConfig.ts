import { convertToAppConfigRO } from "../ROConverter";
import Db from "../db";
import { AppConfigRO } from "src/localDb/models/AppConfigRO";

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

export async function initiateAppConfig() {
  const realm = new Realm(Db.getInstance());
  try {
    let appConfigRO = convertToAppConfigRO();
    realm.write(() => {
      realm.create(AppConfigRO.schema.name, appConfigRO, Realm.UpdateMode.All);
    });
  } finally {
    realm.close();
  }
}
