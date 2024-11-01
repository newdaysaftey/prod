// app/api/auth/signup/route.ts
import { validateSignupRequest } from "@/lib/api.middleware";
import { NextRequest } from "next/server";
import { SignupController } from "./signup.controller";
export const dynamic = "dynamic";
const controller = new SignupController();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationError = await validateSignupRequest(body);
  if (validationError) {
    return validationError;
  }
  return controller.signup(body);
}
