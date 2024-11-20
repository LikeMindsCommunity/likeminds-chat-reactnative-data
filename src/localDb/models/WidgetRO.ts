import {
  ID,
  INT,
  MIXED,
  OPTIONAL_MIXED,
  STRING,
  WIDGET_RO,
} from "../constants";
import Realm from "realm";

export class WidgetRO extends Realm.Object<WidgetRO> {
  id!: string;
  parentEntityId!: string;
  parentEntityType!: string;
  metadata!: Record<string, any>;
  _lm_meta?: Record<string, any> | null;
  createdAt!: number;
  updatedAt!: number;

  static schema: Realm.ObjectSchema = {
    name: WIDGET_RO,
    properties: {
      id: STRING,
      parentEntityId: STRING,
      parentEntityType: STRING,
      metadata: MIXED,
      _lm_meta: OPTIONAL_MIXED,
      createdAt: INT,
      updatedAt: INT,
    },
    primaryKey: ID,
  };
}
