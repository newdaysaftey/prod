import { ApiResponse } from '../types';

export class BaseService {
  protected async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return response.json();
  }

  protected getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }
}