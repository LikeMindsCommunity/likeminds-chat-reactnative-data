import  SdkConfig  from "@likeminds.community/chat-js"; 
import { LMSeverity, LMStackTrace}  from "@likeminds.community/chat-js"; 

export default interface LMInitiateLoggerRequest {
    sdkConfig: SdkConfig;
    shareLogsWithLM: boolean;
    onErrorHandler: (exception: string, stackTrace: LMStackTrace) => void;
    logLevel: LMSeverity;
}
