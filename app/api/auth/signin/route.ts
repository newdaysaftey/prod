// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SigninController } from "./controller";
import { UserRole } from "@/app/types/global";
import { checkRole } from "@/app/middilewares/middileware";

const controller = new SigninController();
export const dynamic = "dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return await controller.signin(body);
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      {
        error: true,
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred in signin",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN])(request);

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
