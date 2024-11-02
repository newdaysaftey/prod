import { NextRequest, NextResponse } from "next/server";
import { ApiError, ApiResponse } from "../types";

export class BaseController {
  protected sendSuccess<T>(data: T, message = "Success"): NextResponse {
    const response: ApiResponse<T> = {
      error: false,
      message,
      data,
    };
    return NextResponse.json(response);
  }

  protected sendError(error: string | Error, status = 400): NextResponse {
    const errorResponse: ApiError = {
      error: true,
      message: error instanceof Error ? error.message : error,
      data: {},
    };
    return NextResponse.json(errorResponse, { status });
  }

  protected async parseBody<T>(request: NextRequest): Promise<T> {
    try {
      return await request.json();
    } catch (error) {
      throw new Error("Invalid request body");
    }
  }
}
