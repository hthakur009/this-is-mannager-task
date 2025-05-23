import { dbConnection } from "@/helper/DBconnection";
import { getResponse } from "@/helper/Response";
import { Task } from "@/models/tasks";
import { NextRequest, NextResponse } from "next/server";

// GET single task by ID
export async function GET(
  _request: NextRequest,
  { params }
) {
  const { todoId } =await params;
  try {
    await dbConnection();
    const task = await Task.findById(todoId);
    return NextResponse.json(task, {
      status: 200,
      statusText: "get task success",
    });
  } catch (err) {
    console.log(err);
    return getResponse("Failed to get data", 504, false);
  }
}

// UPDATE task by ID
export async function PUT(
  request: NextRequest,
  { params }
) {
  const { todoId } =await params;
  const { title, content }= await request.json();

  try {
    await dbConnection();
    const task = await Task.findById(todoId);

    if (!task) {
      return getResponse("Task not found", 404, false);
    }

    task.title = title;
    task.content = content;
    const updatedTask = await task.save();

    return NextResponse.json(updatedTask, {
      status: 200,
      statusText: "Update task success",
    });
  } catch (err) {
    console.log(err);
    return getResponse("Task could not be updated", 409, false);
  }
}

// DELETE task by ID
export async function DELETE(
  _request: NextRequest,
  { params }
) {
  const { todoId } =await params;
  try {
    await dbConnection();
    await Task.findByIdAndDelete(todoId);
    return getResponse("Task deleted successfully", 200, true);
  } catch (err) {
    console.log(err);
    return getResponse("Task could not be deleted", 409, false);
  }
}
