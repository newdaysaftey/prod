import { NextRequest, NextResponse } from "next/server";
import { CategoryController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "force-dynamic"; // Better explicitly force dynamic for data endpoints
const controller = new CategoryController();

// Shared error handler
const handleError = (error: unknown) => {
  console.error("Route Error:", error);
  const message =
    error instanceof Error ? error.message : "Error processing request";
  return NextResponse.json(
    {
      success: false,
      error: true,
      message,
      ...(process.env.NODE_ENV === "development" && { details: error }),
    },
    { status: 500 }
  );
};

// Middleware to handle auth and roles
const withAuth = async (
  request: NextRequest,
  handler: (authResult: any) => Promise<NextResponse>
) => {
  try {
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }

    return await handler(authResult);
  } catch (error) {
    return handleError(error);
  }
};

export async function POST(request: NextRequest) {
  return withAuth(request, async (authResult) => {
    try {
      const body = await request.json();

      // Optional: Validate body here if needed
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
          { success: false, error: true, message: "Request body is required" },
          { status: 400 }
        );
      }

      return await controller.createCategory(body);
    } catch (error) {
      return handleError(error);
    }
  });
}

export async function GET(request: NextRequest) {
  return withAuth(request, async (authResult) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      // Optional: Add query parameter handling if needed
      const response = await controller.getCategory();

      return response;
    } catch (error) {
      return handleError(error);
    }
  });
}
