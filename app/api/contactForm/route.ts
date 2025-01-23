import { NextRequest, NextResponse } from "next/server";
import { ContactFormController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "force-dynamic"; // Better explicitly force dynamic for data endpoints
const controller = new ContactFormController();

export async function POST(request: NextRequest) {
  try {
    return await controller.sendContactFormEmail(request);
  } catch (error) {
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
