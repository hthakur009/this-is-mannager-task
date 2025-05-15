import { dbConnection } from "@/helper/DBconnection";
import { getResponse } from "@/helper/Response";
import { Task } from "@/models/tasks";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(){
    try{
        await dbConnection();
        const tasks =await Task.find();
        return NextResponse.json(tasks,{message:"get task successfully",status:203});
    }
    catch(err){
        console.log(err);
        return getResponse("Feilde get data",504,false);
    }
}



export async function POST(request:NextRequest){
    const {title, content, userId, status} =await request.json();
    console.log({title, content, userId,status});
    try{
        await dbConnection();
 
         const authToken = request.cookies.get("loginToken")?.value;         
        const data = await jwt.verify(authToken,process.env.JWT_KEY);
      

        const task =await new Task({
            title,
            content,
            userId:data._id,
            status
        });

       const createTask = await task.save();
        
        return NextResponse.json(createTask,{message:"new task added", status:201});
    }
    catch(err){
        console.log(err);
        return getResponse("Feilde task added",504,false);
    }
}