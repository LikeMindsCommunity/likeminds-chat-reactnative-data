import { LMSeverity } from "../../../enums/LMSeverity";
import { LMSDKMeta } from "../../../shared/responseModels/LMSDKMeta";
import { LMStackTrace } from "../../../shared/responseModels/LMStackTrace";

export default interface LMInitiateLoggerRequest {
    sdkConfig: LMSDKMeta;
    shareLogsWithLM: boolean;
    onErrorHandler: (exception: string, stackTrace: LMStackTrace) => void;
    logLevel: LMSeverity;
}