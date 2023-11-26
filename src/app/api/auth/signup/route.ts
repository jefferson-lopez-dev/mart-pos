import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password, fullname } = await request.json();
    const userFound = await User.findOne({ email });

    if (fullname === "") {
      return NextResponse.json({
        message: "Full name is required",
        status: 409,
      });
    }

    if (userFound) {
      return NextResponse.json({
        message: "Email already exists",
        status: 409,
      });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({
        message: "Password must be at least 6 characters",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    return NextResponse.json({
      status: 204,
      message: "Account created successfully",
      fullname: savedUser.fullname,
      email: savedUser.email,
      id: savedUser._id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
