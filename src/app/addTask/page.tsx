"use client"

import { addTask } from "@/services/TaskServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTask() {
    const router = useRouter();
    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "",
        userId: "681de32743b454606c86b242"
      });
      
     async function handleTask(event:any) {
        event.preventDefault();
        console.log(task);
        try{
            const retuslt = await addTask(task);
            console.log(retuslt);
            setTask({
                title: "",
                content: "",
                status: "",
                userId: "681de32743b454606c86b242"
              });
            toast.success("Add Task Succefully",{position:"top-center"})
         
        }catch(err){
            console.log(err);
        }
      }
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Add Your Task Here !!</h1>
        </div>
  
        <form onSubmit={handleTask}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task title"
              name="task_title"
              onChange={(event)=>{
                    setTask({
                        ...task,
                        title:event.target.value
                    })
              }}
              value={task.title}
            />
          </div>
  
         
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task description"
              name="task_content"
              onChange={(event)=>{
                    setTask({
                        ...task,
                        content:event.target.value
                    })
              }}
              value={task.content}
            />
          </div>
  
         
          <div className="mb-6">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    
              name="task_status"
              onChange={(event)=>{
                    setTask({
                        ...task,
                        status:event.target.value
                    })
              }}
              value={task.status}
            >
              <option value="" disabled>
                ---- Select ----
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
  
        
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition "
            >
             Clear
            </button>
          
          </div>
        </form>
      </div>
    );
  }
  