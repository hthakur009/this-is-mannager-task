import { NextResponse } from "next/server"

export  const getResponse = (message:any,statusCode:any, success:any)=>{
    return NextResponse.json({message:message, status:statusCode},{success:success});
}