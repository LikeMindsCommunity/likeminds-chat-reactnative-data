import { LMSeverity } from "../../enums/LMSeverity";
import { LMDeviceDetails } from "./LMDeviceDetails";
import { LMSDKMeta } from "./LMSDKMeta";
import { LMStackTrace } from "./LMStackTrace";

export interface Log {
    timestamp: number;
    deviceMeta: LMDeviceDetails;
    stackTrace: LMStackTrace;
    sdkMeta?: LMSDKMeta;
    severity?: LMSeverity;
}