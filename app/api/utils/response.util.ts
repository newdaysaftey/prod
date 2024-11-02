import { ApiResponse } from "../types/response.type";

export const createResponse = <T>(
  error: boolean,
  message: string,
  data: T | null
): ApiResponse<T> => {
  return {
    error,
    message,
    data,
  };
};

// Optional: Create convenience methods for success and error
export const successResponse = <T>(
  message: string,
  data: T
): ApiResponse<T> => {
  return createResponse(false, message, data);
};

export const errorResponse = (message: string): ApiResponse<null> => {
  return createResponse(true, message, null);
};
