import { httpAxios } from "../helper/HttpHelper";

export async function addTask(tasks){
       const retuslt = await httpAxios.post("/api/todos",tasks).then((reponse)=>reponse.data);
       return retuslt;
}

export async function getTaskFromUser(userId){
       const retuslt = await httpAxios.get(`/api/users/${userId}/tasks`).then((reponse)=>reponse.data);
       return retuslt;
}

export async function deleteTakFromList(taskId){
       const retuslt = await httpAxios.delete(`/api/todos/${taskId}`).then((reponse)=>reponse.data);
       return retuslt;
}