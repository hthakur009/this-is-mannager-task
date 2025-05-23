import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/helper/DBconnection";
import jwt from "jsonwebtoken";
import { console } from "inspector";


export async function POST(request:NextRequest){
 const {email, password} = await request.json();   

 try{
    await dbConnection();
    const user = await User.findOne({
        email:email,
    });
    console.log(user);
    if(user==null){
        throw new Error("user not found");
    }

    const matched = bcrypt.compareSync(password, user.password);
    if(!matched){
        throw new Error("Password not matched");
    }
    const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_KEY!
    );

    console.log(token);
    const response = NextResponse.json({message:"loging succefuly", success:true})
    response.cookies.set("loginToken", token, {
        maxAge:60*60*24,
        httpOnly:true
    });
    return response;
 }catch (err) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
        errorMessage = err.message;
    }

    return NextResponse.json(
        { message: errorMessage, success: false },
        { status: 500 }
    );
}
}