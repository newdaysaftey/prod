import { NextRequest, NextResponse } from "next/server";
import { TagController } from "../controller";
import { checkRole } from "@/app/middilewares/middileware";
import { UserRole } from "@/app/types/global";

export const dynamic = "auto";
const controller = new TagController();

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
    return controller.addProductsToTag(body.tagId, body.productIds);
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
