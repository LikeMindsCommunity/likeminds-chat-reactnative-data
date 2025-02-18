import Realm from "realm";
import { STRING, INT, OPTIONAL_STRING } from "../constants";

export class LMStackTraceDBModel extends Realm.Object<LMStackTraceDBModel> {
  exception!: string;
  trace!: string;

  static schema: Realm.ObjectSchema = {
    name: "LMStackTraceDBModel",
    properties: {
      exception: STRING,
      trace: STRING,
    },
  };
}

export class LMSDKMetaDBModel extends Realm.Object<LMSDKMetaDBModel> {
  dataLayerVersion?: string | null;
  coreVersion?: string | null;
  severity?: string | null;

  static schema: Realm.ObjectSchema = {
    name: "LMSDKMetaDBModel",
    properties: {
      dataLayerVersion: OPTIONAL_STRING,
      coreVersion: OPTIONAL_STRING,
      severity: OPTIONAL_STRING,
    },
  };
}

export class LMLogDBModel extends Realm.Object<LMLogDBModel> {
  timestamp!: number;
  stack_trace!: LMStackTraceDBModel;
  sdk_meta?: LMSDKMetaDBModel | null;

  static schema: Realm.ObjectSchema = {
    name: "LMLogDBModel",
    properties: {
      timestamp: INT,
      stack_trace: "LMStackTraceDBModel",
      sdk_meta: "LMSDKMetaDBModel?",
    },
    primaryKey: "timestamp",
  };
}
