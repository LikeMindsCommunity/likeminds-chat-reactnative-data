import { LMSDKMeta, LMSeverity, LMStackTrace } from "@likeminds.community/chat-js";


export default interface LMInitiateLoggerRequest {
    sdkConfig: LMSDKMeta;
    shareLogsWithLM: boolean;
    onErrorHandler: (exception: string, stackTrace: LMStackTrace) => void;
    logLevel: LMSeverity;
}