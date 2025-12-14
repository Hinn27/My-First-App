// src/utils/logger.js
// Centralized logging utility for error handling and debugging

const isDevelopment = __DEV__;

class Logger {
    /**
     * Log info messages (only in development)
     */
    static info(message, data = null) {
        if (isDevelopment) {
            console.log(`ℹ️ [INFO]: ${message}`, data || "");
        }
    }

    /**
     * Log warning messages
     */
    static warn(message, data = null) {
        if (isDevelopment) {
            console.warn(`⚠️ [WARN]: ${message}`, data || "");
        }
    }

    /**
     * Log error messages and optionally report to crash reporting service
     */
    static error(message, error = null) {
        if (isDevelopment) {
            console.error(`❌ [ERROR]: ${message}`, error || "");
        }

        // TODO: Add crash reporting service integration (e.g., Sentry, Firebase Crashlytics)
        // Example:
        // if (!isDevelopment && error) {
        //     Sentry.captureException(error, {
        //         tags: { context: message }
        //     });
        // }
    }

    /**
     * Log debug messages (only in development)
     */
    static debug(message, data = null) {
        if (isDevelopment) {
            console.debug(`🐛 [DEBUG]: ${message}`, data || "");
        }
    }

    /**
     * Log API call errors with standardized format
     */
    static apiError(endpoint, error, context = {}) {
        const errorMessage = error?.message || "Unknown API error";
        const statusCode = error?.response?.status || "N/A";

        Logger.error(
            `API Error at ${endpoint} (Status: ${statusCode})`,
            {
                message: errorMessage,
                ...context,
            }
        );
    }
}

export default Logger;
