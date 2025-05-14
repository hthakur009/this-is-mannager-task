import { dbConnection } from "@/helper/DBconnection";
import { getResponse } from "@/helper/Response";
import { Task } from "@/models/tasks";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest, context:{params:{todoId:String}}) {
        const {todoId}  =  context.params;
        try{
            await dbConnection();
            const task = await Task.findById(todoId);
            return NextResponse.json(task,{
                message:"get task success",
                status:201
            });
        }
        catch(err){
            console.log(err);
            return getResponse("Feilde get data",504,false);
        }  
}

//update taks
export async function PUT(request:NextRequest, context:{params:{todoId:String}}){
    const {todoId} = context.params;
    let {title,content} =await request.json();
    try{
        await dbConnection();
        const task =await Task.findById(todoId);
        task.title = title;
        task.content = content;
        const updateTask = await task.save();
        return NextResponse.json(updateTask,{
            message:"update task success",
            status:201
        });
    }
    catch(err){
        console.log(err);
        return getResponse("task can not be updated", 409, false);
    }
}

//delete task
export async function DELETE(request:NextRequest, context:{params:{todoId:String}}){
    const {todoId} =await context.params;
    try{
        await dbConnection();
        await Task.findByIdAndDelete(todoId);
        return getResponse("task deleted succefully", 201,true);
    }
    catch(err){
        console.log(err);
        return getResponse("task can not be deleted", 409, false);
    }
} 