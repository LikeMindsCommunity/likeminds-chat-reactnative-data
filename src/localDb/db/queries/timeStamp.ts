import { TimeStampRO } from "../../models/TimeStampRO";
import { convertToTimeStampRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// To updated the timestamp in realm
export async function updateTimeStamp(maxTimeStamp: number, isDm: boolean) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const timeStampStored = realm.objects<TimeStampRO>(
        TimeStampRO.schema.name
      )[0];
      isDm
        ? (timeStampStored.minTimeStampDm = maxTimeStamp)
        : (timeStampStored.minTimeStampGroup = maxTimeStamp);
    });
  } finally {
    realm.close();
  }
}

// To get stored timestamp from Realm
export async function getTimeStamp() {
  const realm = new Realm(Db.getInstance());
  try {
    const timeStampStored = realm.objects(TimeStampRO.schema.name);
    const serializedData = JSON.parse(JSON.stringify(timeStampStored));
    return serializedData;
  } finally {
    realm.close();
  }
}

// To save timestamp in Realm
export async function initiateTimeStamp() {
  const realm = new Realm(Db.getInstance());
  try {
    let timeStampRO = convertToTimeStampRO();
    realm.write(() => {
      realm.create(TimeStampRO.schema.name, timeStampRO, Realm.UpdateMode.All);
    });
  } finally {
    realm.close();
  }
}
