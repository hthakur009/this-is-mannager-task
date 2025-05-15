import { NextResponse } from "next/server"

export  const getResponse = (message,statusCode, success)=>{
    return NextResponse.json({message:message, status:statusCode},{success:success});
}