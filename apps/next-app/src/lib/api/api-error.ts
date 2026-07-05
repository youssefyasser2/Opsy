import type { AxiosError } from "axios";
import type { ApiErrorBody } from "@/lib/types/api";

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function extractErrorMessage(data: unknown) {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (typeof data !== "object" || data === null) {
    return "Something went wrong.";
  }

  const body = data as ApiErrorBody;
  if (Array.isArray(body.message)) {
    return body.message.join(", ");
  }

  if (typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }

  if (typeof body.error === "string" && body.error.trim()) {
    return body.error;
  }

  return "Something went wrong.";
}

export function normalizeApiError(error: unknown) {
  if (error instanceof ApiError) {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError
  ) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    const responseMessage = axiosError.response?.data
      ? extractErrorMessage(axiosError.response.data)
      : axiosError.message || "Something went wrong.";

    return new ApiError(
      responseMessage,
      axiosError.response?.status,
      axiosError.response?.data,
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("Something went wrong.");
}
