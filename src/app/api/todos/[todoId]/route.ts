import { dbConnection } from "@/helper/DBconnection";
import { getResponse } from "@/helper/Response";
import { Task } from "@/models/tasks";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET single task by ID
export async function GET(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;
  try {
    await dbConnection();
    const task = await Task.findById(todoId);

    if (!task) {
      return getResponse("Task not found", 404, false);
    }

    return NextResponse.json(task, {
      status: 200,
      statusText: "Get task success",
    });
  } catch (err) {
    console.error(err);
    return getResponse("Failed to get data", 504, false);
  }
}

// ✅ UPDATE task by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;
  const { title, content } = await request.json();

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
    console.error(err);
    return getResponse("Task could not be updated", 409, false);
  }
}

// ✅ DELETE task by ID
export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { todoId } = params;

  try {
    await dbConnection();
    await Task.findByIdAndDelete(todoId);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
    });
  }
}
