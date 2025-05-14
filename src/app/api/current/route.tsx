import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { dbConnection } from "@/helper/DBconnection";

export  async function GET(request:NextRequest){
    const authToken:any = request.cookies.get("loginToken")?.value;
    await dbConnection();
    const data =  jwt.verify(authToken,process.env.JWT_KEY);
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json(user);
}