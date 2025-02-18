import  SdkConfig  from "@likeminds.community/chat-js/"; 
import { LMStackTraceDBModel } from "src/localDb/models/LogRO";
import {  LMSeverity }  from "@likeminds.community/chat-js/"; 

export interface LMInitiateLoggerRequest {
    sdkConfig: SdkConfig;
    shareLogsWithLM: boolean;
    onErrorHandler: (exception: string, stackTrace: LMStackTraceDBModel) => void;
    logLevel: LMSeverity;
}
