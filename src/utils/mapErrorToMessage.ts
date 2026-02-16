import { ZodError } from "zod";

export type AppErrorCode =
  | "DATA_VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export interface AppError {
  code: AppErrorCode;
  message: string;
}

/**
 * Returns true if the current environment is set to "production",
 * false otherwise.
 * @returns {boolean} True if the environment is "production", false otherwise.
 */
function isProduction(): boolean {
  return import.meta.env?.MODE === "production";
}

/**
 * Maps an error to an AppError object.
 * If the error is a Zod validation error, it will be mapped to a DATA_VALIDATION_ERROR.
 * If the error is an Error object for example with a message containing "not found", it will be mapped to a NOT_FOUND error.
 * If the error is an Error object with a different message, it will be mapped to a NETWORK_ERROR.
 * If the error is of an unknown type, it will be mapped to an INTERNAL_ERROR.
 * @param {unknown} error - The error to be mapped.
 * @param {string} fallbackMessage - The message to be used if the error is of an unknown type.
 * @returns {AppError} An AppError object containing an error code and message.
 */
export function mapErrorToMessage(
  error: unknown,
  fallbackMessage: string,
): AppError {
  // Error handling can be improved further (for example - error messages shown to users, 
  // all errors reporting to monitoring tools like Sentry etc), but it's out of scope for this project.

  // Zod validation error
  if (error instanceof ZodError) {
    if (!isProduction()) {
      console.error("Zod validation error:", error.flatten());
    }

    return {
      code: "DATA_VALIDATION_ERROR",
      message: "Error parsing API response.",
    };
  }

  // Domain-specific error types
  if (error instanceof Error) {
    if (error.message.toLowerCase().includes("not found")) {
      return {
        code: "NOT_FOUND",
        message: "Requested resource was not found.",
      };
    }
    // Additional domain-specific error types (e.g., BadRequestError,
    // ForbiddenError, UnprocessableEntityError) can be mapped here if needed.
    // Out of scope for this project.

    return {
      code: "NETWORK_ERROR",
      message: error.message || fallbackMessage,
    };
  }

  // Unknown error type
  if (!isProduction()) {
    console.error("Unknown error:", error);
  }

  return {
    code: "INTERNAL_ERROR",
    message: fallbackMessage,
  };
}
