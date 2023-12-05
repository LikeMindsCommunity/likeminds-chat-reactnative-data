import { INT, NUMBER_RO } from "../constants";

export class NumberRO extends Realm.Object<NumberRO> {
  value: number;

  static schema: Realm.ObjectSchema = {
    name: NUMBER_RO,
    properties: {
        value: INT,
    },
  };
}
