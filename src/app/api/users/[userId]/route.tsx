import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dbConnection } from "@/helper/DBconnection";
import { User } from "@/models/user";



// GET single user
export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;

  try {
    dbConnection();
    const user = await User.findById(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Cannot get data", status: false });
  }
}

// PUT (update user)
export async function PUT(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;
  const { name, email, password, about, profile } = await request.json();

  try {
    dbConnection();
    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found", status: false });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.about = about;
    user.profile = profile;

    const updatedUser = await user.save();
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update user", status: false });
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;

  try {
    dbConnection();
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted successfully", status: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete user", status: false });
  }
}
