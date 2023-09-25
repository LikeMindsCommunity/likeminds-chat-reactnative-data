import { TimeStampRO } from "../../models/TimeStampRO";
import { convertToTimeStampRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// To updated the timestamp in realm
export async function updateTimeStamp(
  realm: Realm,
  minTimeStamp: number,
  maxTimeStamp: number
) {
  realm.write(() => {
    const timeStampStored: any = realm.objects(TimeStampRO.schema.name)[0];
    timeStampStored.minTimeStamp = minTimeStamp;
    timeStampStored.maxTimeStamp = maxTimeStamp;
  });
}

// To get stored timestamp from Realm
export async function getTimeStamp(realm: Realm) {
  const timeStampStored = realm.objects(TimeStampRO.schema.name);
  const serializedData = JSON.parse(JSON.stringify(timeStampStored));
  return serializedData;
}

// To save timestamp in Realm
export async function saveTimeStamp(
  realm: Realm,
  minTimeStamp: number,
  maxTimeStamp: number
) {
  let timeStampRO = convertToTimeStampRO(minTimeStamp, maxTimeStamp);
  realm.write(() => {
    realm.create(TimeStampRO.schema.name, timeStampRO, Realm.UpdateMode.All);
  });
}
