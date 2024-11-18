// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PaymentController } from "./controller";
import { UserRole } from "@/app/types/global";
import { checkRole } from "@/app/middilewares/middileware";

const controller = new PaymentController();
export const dynamic = "auto";

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    const response = await controller.updatePayment(request);
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
