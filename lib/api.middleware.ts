import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
export const dynamic = "dynamic";

// Validation schemas
const signupSchema = z.object({
  Email: z.string().email("Valid email is required."),
  Password: z.string().min(6, "Password must be at least 6 characters long."),
  FirstName: z.string().min(1, "First name is required."),
  LastName: z.string().min(1, "Last name is required."),
  Role: z.enum(["USER", "ADMIN"]).optional(),
});

const loginSchema = z.object({
  Email: z.string().email("Valid email is required."),
  Password: z.string().min(1, "Password is required."),
});

// Auth middlewares
export async function validateSignupRequest(body: any) {
  try {
    console.log(body.body);
    // Validate the request body
    const validatedData = signupSchema.parse(body);
    // console.log(validatedData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { Email: validatedData.Email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email." },
        { status: 400 }
      );
    }

    return null; // No errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation errors occurred.", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred during validation." },
      { status: 500 }
    );
  }
}

export async function validateLoginRequest(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    loginSchema.parse(body);

    return null; // No errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation errors occurred.", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred during validation." },
      { status: 500 }
    );
  }
}

// You can add more middleware functions here as needed
// For example:
// export async function validateProfileUpdateRequest(request: NextRequest) { ... }
// export async function validatePasswordResetRequest(request: NextRequest) { ... }
