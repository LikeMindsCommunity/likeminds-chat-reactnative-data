import { insertLog, getLogs, clearLogs } from "../../localDb/db/queries/logService"; // Ensure these functions are properly implemented
import   ErrorLogging, {  LMSeverity }  from "@likeminds.community/chat-js/"; // Function to push logs to GCP
import DeviceInfo from "react-native-device-info";
import { LMStackTraceDBModel } from "src/localDb/models/LogRO";
import { LMInitiateLoggerRequest } from "src/shared/responseModels/InitiateLoggerRequest";

export class LMChatLogger {
  static instance: LMChatLogger | null = null;
  request: LMInitiateLoggerRequest;

  private constructor(request: LMInitiateLoggerRequest) {
    this.request = request;
  }

  /**
   * Initializes the LMChatLogger singleton instance
   */
  static initialise(request: LMInitiateLoggerRequest) {
    if (!this.instance) {
      this.instance = new LMChatLogger(request);
    }
  }

  /**
   * Returns the LMChatLogger singleton instance
   */
  static getInstance(): LMChatLogger {
    if (!this.instance) {
      throw new Error("LMChatLogger is not initialized. Call initialise() first.");
    }
    return this.instance;
  }

  /**
   * Handles exceptions, logs them locally, and optionally pushes logs to GCP
   */
  static handleException(exception: string, stackTrace: LMStackTraceDBModel, severity: LMSeverity) {
    const logger = this.getInstance();

    if (logger.request.logLevel > severity) return;

    insertLog({
      timestamp: Date.now(),
      stackTrace: { exception, trace: stackTrace },
      severity,
    });

    if (logger.request.shareLogsWithLM) {
      console.log("Pushing logs to GCP...");
      LMChatLogger.flushLogs();
    }

    logger.request.onErrorHandler(exception, stackTrace);
  }

  /**
   * Fetches device details using react-native-device-info
   */
  static async getDeviceDetails() {
    return {
      brand: await DeviceInfo.getBrand(),
      model: await DeviceInfo.getModel(),
      systemVersion: await DeviceInfo.getSystemVersion(),
      uniqueId: await DeviceInfo.getUniqueId(),
      appVersion: await DeviceInfo.getVersion(),
    };
  }

  /**
   * Flushes logs: retrieves logs, adds device details, pushes logs to GCP, and clears them if successful
   */
  static async flushLogs() {
    if (!this.instance) return;

    const currentTimestamp = Date.now();
    const logs = await getLogs();
    if (!logs.length) return;

    const deviceDetails = await LMChatLogger.getDeviceDetails();
    const logsWithDevice = logs.map(log => ({ ...log, deviceDetails }));

    try {
      // Use sdkConfig from LMChatLogger's request
      const sdkConfig = this.instance.request.sdkConfig;
      const errorLogging = new ErrorLogging(sdkConfig);
      const pushLogsResponse = await errorLogging.pushLogs({ logs: logsWithDevice });

      console.log("Push Logs Response:", pushLogsResponse);
      if (pushLogsResponse?.success) {
        await clearLogs({ timestamp: currentTimestamp });
      }
    } catch (error) {
      console.error("Error in flushLogs:", error);
    }
  }
}
