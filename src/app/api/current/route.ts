import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { dbConnection } from "@/helper/DBconnection";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("loginToken")?.value;
  const jwtKey = process.env.JWT_KEY;

  if (!authToken || !jwtKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnection();

  try {
    const data = jwt.verify(authToken, jwtKey) as { _id: string };
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
