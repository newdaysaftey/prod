import { NextRequest, NextResponse } from "next/server";
import { ProductController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";
export const dynamic = "auto";
const controller = new ProductController();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN], request);

    if (authResult instanceof Response) {
      return authResult;
    }
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: true, message: "Request body is required" },
        { status: 400 }
      );
    }
    return controller.createProduct(body);
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

export async function GET(request: NextRequest) {
  try {
    // const authResult = await checkRole(
    //   [UserRole.ADMIN, UserRole.USER],
    //   request
    // );

    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return controller.getProduct(request);
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

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN], request);

    if (authResult instanceof Response) {
      return authResult;
    }
    return controller.deleteProduct(request);
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

export async function PUT(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN], request);

    if (authResult instanceof Response) {
      return authResult;
    }
    return controller.deleteColorVarient(request);
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
