import { clearLogs, getLogs, insertLog } from "../../localDb/db/queries/logService";
import DLClient from "@likeminds.community/chat-js";
import LMInitiateLoggerRequest from "../../shared/responseModels/LMInitiateLoggerRequest";
import { LMDeviceDetails, LMSeverity, LMStackTrace } from "@likeminds.community/chat-js"
import { Base } from "@likeminds.community/chat-js/dist/base";
import { getDevice } from "react-native-device-info";
import getDeviceDetails from "../../utils/getDeviceDetails";

class LMChatLogger {
    static instance = null;
    static initiateLoggerRequest: LMInitiateLoggerRequest;

    constructor(initRequest: LMInitiateLoggerRequest) {
        if (!initRequest) {
            throw new Error("LMChatLogger must be initialized with LMInitiateLoggerRequest");
        }

        LMChatLogger.initiateLoggerRequest = initRequest
    }

    static initialize(initRequest: LMInitiateLoggerRequest) {
        if (!LMChatLogger.instance) {
            LMChatLogger.instance = new LMChatLogger(initRequest);
        }
    }

    static getInstance(): LMChatLogger {
        return this.instance
    }

    static async handleException(exception: Error, stackTrace: LMStackTrace, severity: LMSeverity) {
        if (LMChatLogger.instance == null) return;

        if (this.initiateLoggerRequest?.logLevel > severity) return;

        if (this.initiateLoggerRequest?.shareLogsWithLM) {
            await insertLog({
                timestamp: Date.now(),
                deviceMeta: await getDeviceDetails(),
                stackTrace: stackTrace,
                sdkMeta: {
                    coreVersion: this.initiateLoggerRequest?.sdkConfig?.coreVersion,
                    dataLayerVersion: this.initiateLoggerRequest?.sdkConfig?.dataLayerVersion
                },
                severity: severity
            })

            this.initiateLoggerRequest?.onErrorHandler(exception?.message, stackTrace)
        }


    }

    static async flushLogs(dlClient: DLClient) {
        if (!this.instance) return;

        const logs = await getLogs();
        if (!logs.length) return;

        const deviceDetails = await getDeviceDetails();
        const parsedDeviceDetails = {
            os: deviceDetails?.os,
            version_os: deviceDetails?.versionOS,
            device_name: deviceDetails?.deviceName,
            screen_height: deviceDetails?.screenHeight,
            screen_width: deviceDetails?.screenWidth,
            wifi: deviceDetails?.wifi ?? false
        }
        const logsWithDevice = logs.map(log => ({ ...log, device_meta: parsedDeviceDetails }));

        try {
            const pushLogsResponse = await dlClient?.pushLogs({ logs: logsWithDevice });
            if (pushLogsResponse?.success) {
                await clearLogs({ timestamp: Date.now()?.toString() });
            }
        } catch (error) {
            console.error("Error in flushLogs:", error);
        }
    }
}

export default LMChatLogger;