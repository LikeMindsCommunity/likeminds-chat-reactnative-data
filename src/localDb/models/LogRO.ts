import Realm from "realm";
import { STRING, INT, OPTIONAL_STRING, LM_STACK_TRACE_RO, OPTIONAL_LMSDK_MetaDB_RO } from "../constants";

export class LMStackTraceDBModelRO extends Realm.Object<LMStackTraceDBModelRO> {
  exception!: string;
  trace!: string;

  static schema: Realm.ObjectSchema = {
    name: "LMStackTraceDBModelRO",
    properties: {
      exception: STRING,
      trace: STRING,
    },
    embedded: true,
  };
}

export class LMSDKMetaDBModelRO extends Realm.Object<LMSDKMetaDBModelRO> {
  dataLayerVersion?: string | null;
  coreVersion?: string | null;

  static schema: Realm.ObjectSchema = {
    name: "LMSDKMetaDBModelRO",
    properties: {
      dataLayerVersion: OPTIONAL_STRING,
      coreVersion: OPTIONAL_STRING,
      severity: OPTIONAL_STRING,
    },
    embedded: true,
  };
}

export class LMLogDBModelRO extends Realm.Object<LMLogDBModelRO> {
  timestamp!: number;
  stack_trace!: LMStackTraceDBModelRO;
  sdk_meta?: LMSDKMetaDBModelRO | null;
  severity?: string | null

  static schema: Realm.ObjectSchema = {
    name: "LMLogDBModelRO",
    properties: {
      timestamp: INT,
      stack_trace: LM_STACK_TRACE_RO,
      sdk_meta: OPTIONAL_LMSDK_MetaDB_RO,
      severity: OPTIONAL_STRING
    },
    primaryKey: "timestamp",
  };
}
