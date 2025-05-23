import { dbConnection } from "@/helper/DBconnection";
import { getResponse } from "@/helper/Response";
import { Task } from "@/models/tasks";
import { User } from "@/models/user";
import {  NextResponse } from "next/server";


export async function GET(request, {params}){
    const {userId} = await params;
   
    try{
        await dbConnection();
        const user = await User.findById(userId);
        const tasks =await Task.find({userId:userId,});
        const full = [user, tasks];
        const response = { message: "get task successfully", status: 203 };

        return NextResponse.json(full,response);
    }
    catch(err){
        console.log(err);
        return getResponse("Feilde get data",504,false);
    }
}
