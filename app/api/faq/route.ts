import { NextRequest, NextResponse } from "next/server";
import { faqController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "dynamic";

export async function GET(request: NextRequest) {
  try {
    const authResult = await checkRole([])(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    return faqController.handleGetFAQs();
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

export async function POST(request: NextRequest) {
  try {
    return faqController.handleQuestion(request);
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
