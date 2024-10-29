// Common types for API responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Error response type
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
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