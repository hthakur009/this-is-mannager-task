"use client"

import { UserContext } from "@/app/context/contextProvider";
import { deleteTakFromList, getTaskFromUser } from "@/services/TaskServices";
import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

export function DisplayTask() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);

  async function loadData(userId) {
    try {
      const tasks = await getTaskFromUser(userId);
      console.log(tasks);
      setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      loadData(user._id);
    }
  }, [user]);

  const userInfo = tasks[0];
  const userTasks = tasks[1] || [];

  async function deleteTask(taskId){
        try{
            const res = await deleteTakFromList(taskId);
            console.log(res);
             if (user && user._id) {
               loadData(user._id);
            }
        }catch(err){
            console.log(err);
            toast.error("Task deleteing err!!");
        }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold bg-amber-950 text-white px-6 py-4 rounded mb-6 shadow-md">
        User Tasks ({userTasks.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTasks.map((task, key) => (
          <div
            key={key}
            className={`p-6 rounded-xl shadow-lg border transition-all duration-200 ${
              task.status === "completed" ? "bg-green-800" : "bg-gray-800"
            } text-white`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <span onClick={()=>{{deleteTask(task._id)}}}
                className={`text-xs px-1 py-1 rounded-full font-medium cursor bg-black  w-9 h-9 flex justify-center items-center`}
              >
                <ImCross />
              
              </span>
            </div>
            <p className="text-sm mb-3 text-gray-200">{task.content}</p>
            <h4 className="text-sm text-neutral-50 ">Author: {userInfo?.name}</h4>
            <span
                className={`text-xs px-2 py-1 rounded-full font-medium  ${
                  task.status === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-yellow-600 text-white"
                }`}
              >
                              {task.status}
              </span>

          </div>
        )).reverse()}
      </div>
    </div>
  );
}
