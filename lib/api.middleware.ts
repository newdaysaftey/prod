import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
export const dynamic = "auto";

interface SignupRequestBody {
  Email: string;
  Password: string;
  Username: string;
  FirstName: string;
  LastName: string;
  Role: string;
}

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
export async function validateSignupRequest(body: SignupRequestBody) {
  try {
    // Validate the request body
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { Email: validatedData.Email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: true, message: "user already exists", data: null },
        { status: 400 }
      );
    }

    return null; // No errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: true,
          message: "Validation errors occurred.",
          data: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: true,
        message: "An error occurred during validation.",
        data: null,
      },
      { status: 500 }
    );
  }
}
