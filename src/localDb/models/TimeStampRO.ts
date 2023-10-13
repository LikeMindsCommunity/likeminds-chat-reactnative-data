import Realm from "realm";
import { TIME_STAMP_RO, OPTIONAL_INT } from "../constants";

export class TimeStampRO extends Realm.Object<TimeStampRO> {
  minTimeStampGroup?: number;
  minTimeStampDm?: number;

  static schema: Realm.ObjectSchema = {
    name: TIME_STAMP_RO,
    properties: {
      minTimeStampGroup: OPTIONAL_INT,
      minTimeStampDm: OPTIONAL_INT,
    },
  };
}
