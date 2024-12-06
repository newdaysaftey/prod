import { NextRequest, NextResponse } from "next/server";
import { TagController } from "./controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";
export const dynamic = "dynamic";
const controller = new TagController();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authResult = await checkRole([UserRole.ADMIN])(request);

    if (authResult instanceof Response) {
      return authResult;
    }
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: true, message: "Request body is required" },
        { status: 400 }
      );
    }
    return controller.createTag(body.name, body.startDate, body.endDate);
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
    // // const authResult = await checkRole([UserRole.ADMIN])(request);

    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    return controller.getTags();
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
