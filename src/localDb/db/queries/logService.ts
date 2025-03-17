import { Log } from "@likeminds.community/chat-js";
import Db from "../db";
import { convertToLMLogDBModel, convertToLMSDKMetaDBModel, convertToLMStackTraceDBModel } from "../ROConverter";
import { LMLogDBModelRO, LMSDKMetaDBModelRO, LMStackTraceDBModelRO } from "../../../localDb/models/LogRO";
import { LMClearLogsRequest } from "../../../localDb/models/requestModels/LMClearLogsRequest";

export async function insertLog(insertLogRequest: Log) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const stackTraceRO = insertLogRequest?.stackTrace ? convertToLMStackTraceDBModel(insertLogRequest.stackTrace) : null;
      const sdkMetaRO = insertLogRequest?.sdkMeta ? convertToLMSDKMetaDBModel(insertLogRequest.sdkMeta) : null;


      // Directly assign embedded objects while creating the parent object
      const errorLogRO = {
        ...convertToLMLogDBModel(insertLogRequest, stackTraceRO, sdkMetaRO),
      };

      let res = realm.create(LMLogDBModelRO.schema.name, errorLogRO, Realm.UpdateMode.All);
    });
  } finally {
    realm.close();
  }
}

export async function getLogs() {
  const realm = new Realm(Db.getInstance());
  try {
    const logs = realm.objects(LMLogDBModelRO.schema.name);
    return JSON.parse(JSON.stringify(logs));
  } finally {
    realm.close();
  }
}

export async function clearLogs(clearLogsRequest: LMClearLogsRequest) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      const logsToDelete = realm.objects(LMLogDBModelRO.schema.name).filtered(`timestamp < ${clearLogsRequest.timestamp}`);
      realm.delete(logsToDelete);
    });
  } finally {
    realm.close();
  }
}
