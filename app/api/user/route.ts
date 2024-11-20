// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UserController } from "./controller";
import { UserRole } from "@/app/types/global";
import { checkRole } from "@/app/middilewares/middileware";

const controller = new UserController();
export const dynamic = "dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    const response = await controller.updateProfile(
      authResult.User.UserId,
      body
    );
    return response;
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      {
        error: true,
        message: "Error processing request",
        data: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    const response = await controller.getProfile(authResult.User.UserId);
    return response;
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      {
        error: true,
        message: "Error processing request",
        data: error,
      },
      { status: 500 }
    );
  }
}
