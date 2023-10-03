import { TimeStampRO } from "../../models/TimeStampRO";
import { convertToTimeStampRO } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// To updated the timestamp in realm
export async function updateTimeStamp(
  realm: Realm,
  maxTimeStamp: number,
  isDm: boolean
) {
  realm.write(() => {
    const timeStampStored = realm.objects<TimeStampRO>(
      TimeStampRO.schema.name
    )[0];
    isDm
      ? (timeStampStored.minTimeStampDm = maxTimeStamp)
      : (timeStampStored.minTimeStampGroup = maxTimeStamp);
  });
}

// To get stored timestamp from Realm
export async function getTimeStamp(realm: Realm, isDm: boolean) {
  const timeStampStored = realm.objects(TimeStampRO.schema.name);
  const serializedData = JSON.parse(JSON.stringify(timeStampStored));
  if (isDm) {
    return serializedData[0].minTimeStampDm;
  }
  return serializedData[0].minTimeStampGroup;
}

// To save timestamp in Realm
export async function initiateTimeStamp(realm: Realm) {
  let timeStampRO = convertToTimeStampRO();
  realm.write(() => {
    realm.create(TimeStampRO.schema.name, timeStampRO, Realm.UpdateMode.All);
  });
}
