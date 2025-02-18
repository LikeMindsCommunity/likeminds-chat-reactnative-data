import Db from "../db";

export async function insertLog(insertLogRequest) {
    const realm = new Realm(Db.getInstance());
    try {
      realm.write(() => {
        const stackTrace = realm.create("LMStackTraceDBModel", insertLogRequest.stackTrace);
        const sdkMeta = insertLogRequest.sdkMeta ? realm.create("LMSDKMetaDBModel", insertLogRequest.sdkMeta) : null;
        realm.create("LMLogDBModel", {
          timestamp: insertLogRequest.timestamp,
          stack_trace: stackTrace,
          sdk_meta: sdkMeta,
          severity: insertLogRequest.severity,
        });
      });
    } finally {
      realm.close();
    }
  }
  
  export async function getLogs() {
    const realm = new Realm(Db.getInstance());
    try {
      const logs = realm.objects("LMLogDBModel");
      return JSON.parse(JSON.stringify(logs));
    } finally {
      realm.close();
    }
  }
  
  export async function clearLogs(clearLogsRequest) {
    const realm = new Realm(Db.getInstance());
    try {
      realm.write(() => {
        const logsToDelete = realm.objects("LMLogDBModel").filtered(`timestamp < ${clearLogsRequest.timestamp}`);
        realm.delete(logsToDelete);
      });
    } finally {
      realm.close();
    }
  }
  