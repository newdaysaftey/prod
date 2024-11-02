// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SigninController } from "./signin.controller";
import { validateCredentials } from "../../middlewares/auth.middleware";

const controller = new SigninController();
export const dynamic = "dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationError = await validateCredentials(body);
  if (validationError.error === true) {
    return NextResponse.json(validationError);
  }
  return controller.signin(body);
}
