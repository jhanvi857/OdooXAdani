import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  // 1️⃣ user exists?
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  // 2️⃣ hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return NextResponse.json(
    { message: "Signup successful" },
    { status: 201 }
  );
}
