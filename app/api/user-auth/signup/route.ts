import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username, firstName, lastName, addresses } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ Email: email }, { Username: username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with addresses in a transaction
    const user = await prisma.$transaction(async (prisma) => {
      // Create user
      const newUser = await prisma.user.create({
        data: {
          Email: email,
          PasswordHash: hashedPassword,
          Username: username,
          FirstName: firstName,
          LastName: lastName,
          Role: "USER",
        },
      });

      // Create addresses
      if (addresses && addresses.length > 0) {
        await prisma.address.createMany({
          data: addresses.map((address: any) => ({
            ...address,
            userId: newUser.UserId,
          })),
        });
      }

      return newUser;
    });

    // Remove password from response
    const { PasswordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
