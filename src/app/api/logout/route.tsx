import {  NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({
        message:"logged out successfuly",
        success:true
    });
   response.cookies.set("loginToken","",{
        maxAge:0,
        httpOnly:true
    });
    return response;
}