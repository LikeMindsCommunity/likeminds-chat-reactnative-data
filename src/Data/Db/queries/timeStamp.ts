import { TimeStampRO } from "../../Models/TimeStampRO";
import { convertToTimeStampRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// To updated the timestamp in realm
export async function updateTimeStamp(
  minTimeStamp: number,
  maxTimeStamp: number
) {
  const realm = await Realm.open(Db.getInstance());
  realm.write(() => {
    const timeStampStored: any = realm.objects(TimeStampRO.schema.name)[0];
    timeStampStored.minTimeStamp = minTimeStamp;
    timeStampStored.maxTimeStamp = maxTimeStamp;
  });
}

// To get stored timestamp from Realm
export async function getTimeStamp() {
  const realm = await Realm.open(Db.getInstance());
  const timeStampStored = realm.objects(TimeStampRO.schema.name);
  return timeStampStored;
}

// To save timestamp in Realm
export async function saveTimeStamp(
  minTimeStamp: number,
  maxTimeStamp: number
) {
  const realm = await Realm.open(Db.getInstance());
  let timeStampRO = convertToTimeStampRO(minTimeStamp, maxTimeStamp);
  realm.write(() => {
    realm.create(TimeStampRO.schema.name, timeStampRO, Realm.UpdateMode.All);
  });
}
