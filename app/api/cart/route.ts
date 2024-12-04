import { NextRequest, NextResponse } from "next/server";
import { CartController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "dynamic";
const controller = new CartController();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    return controller.addtoCart(authResult.User.UserId, body);
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
    const response = await controller.getCart(authResult.User.UserId);
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

export async function DELETE(request: NextRequest) {
  try {
    console.log("----");
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    return controller.deleteFromCart(authResult.User.UserId, request);
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
