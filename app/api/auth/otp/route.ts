// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OtpController } from "./controller";

const controller = new OtpController();
export const dynamic = "dynamic";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    return await controller.generateOTP(body.email);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return await controller.verifyOtp(body);
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
