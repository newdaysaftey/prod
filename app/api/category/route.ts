import { NextRequest, NextResponse } from "next/server";
import { CategoryController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "force-dynamic"; // Better explicitly force dynamic for data endpoints
const controller = new CategoryController();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    // Optional: Validate body here if needed
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: true, message: "Request body is required" },
        { status: 400 }
      );
    }

    return await controller.createCategory(body);
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
    // const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
    //   request
    // );

    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    const response = await controller.getCategory();

    return response;
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
    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    return await controller.deleteCategory(request);
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
    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    return await controller.updateSequence(request);
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

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    return await controller.updateCategory(request);
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
