import { NextRequest, NextResponse } from "next/server";
import { CommentController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";
export const dynamic = "auto";
const controller = new CommentController();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: true, message: "Request body is required" },
        { status: 400 }
      );
    }
    return controller.createComment(authResult.User.UserId, body);
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
    return controller.getComments(request);
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
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: true, message: "Request body is required" },
        { status: 400 }
      );
    }
    return controller.updateComments(authResult.User.UserId, body);
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
    const authResult = await checkRole([UserRole.ADMIN, UserRole.USER])(
      request
    );

    if (authResult instanceof Response) {
      return authResult;
    }
    return controller.deleteComment(authResult.User.UserId, request);
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
