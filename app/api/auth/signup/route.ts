// app/api/auth/signup/route.ts
import { validateSignupRequest } from "@/lib/api.middleware";
import { NextRequest } from "next/server";
import { SignupController } from "./controller";
export const dynamic = "auto";
const controller = new SignupController();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationError = await validateSignupRequest(body);
  if (validationError) {
    return validationError;
  }
  return controller.signup(body);
}
