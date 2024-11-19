import { NextRequest, NextResponse } from "next/server";
import { OrderController } from "../controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "auto";
const controller = new OrderController();

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    const response = await controller.getOrderById(
      authResult.User.UserId,
      params.orderId
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
