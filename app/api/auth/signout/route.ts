import { NextRequest, NextResponse } from "next/server";
import { SignoutController } from "./controller";

const controller = new SignoutController();
export const dynamic = "auto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return await controller.signout(body);
  } catch (error) {
    console.error("Signout error:", error);
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
