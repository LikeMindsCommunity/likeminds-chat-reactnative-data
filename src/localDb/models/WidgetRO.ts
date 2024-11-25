import {
  ID,
  INT,
  OPTIONAL_STRING,
  STRING,
  WIDGET_RO,
} from "../constants";
import Realm from "realm";

export class WidgetRO extends Realm.Object<WidgetRO> {
  id!: string;
  parentEntityId!: string;
  parentEntityType!: string;
  metadata!: string;
  _lm_meta?: string| null;
  createdAt!: number;
  updatedAt!: number;

  static schema: Realm.ObjectSchema = {
    name: WIDGET_RO,
    properties: {
      id: STRING,
      parentEntityId: STRING,
      parentEntityType: STRING,
      metadata: STRING,
      _lm_meta: OPTIONAL_STRING,
      createdAt: INT,
      updatedAt: INT,
    },
    primaryKey: ID,
  };
}
