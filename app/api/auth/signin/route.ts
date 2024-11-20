// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SigninController } from "./controller";

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
