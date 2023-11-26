import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password, fullname } = await request.json();
    return NextResponse.json({
      message: "OK",
      fullname,
      email,
      password,
    });
    const userFound = await User.findOne({ email });

    if (!password || password.length < 6) {
      return NextResponse.json({
        message: "Password must be at least 6 characters",
        status: 400,
      });
    }

    if (userFound) {
      return NextResponse.json({
        message: "Email already exists",
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
      message: "OK",
      fullname: savedUser.fullname,
      email: savedUser.email,
      password: savedUser.password,
      id: savedUser._id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
