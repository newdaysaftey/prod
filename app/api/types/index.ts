// Common types for API responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  error: boolean;
}

// Error response type
export interface ApiError {
  message: string;
  error: boolean;
  data?: Record<string, string[]>;
}

// Pagination types
export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
