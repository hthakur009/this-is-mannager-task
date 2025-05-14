import { httpAxios } from "@/helper/HttpHelper";

export async function userSignup(data:any){
const res = await httpAxios.post("/api/users",data).then((response)=>response.data);
return res;
}

export async function loginUser(logingData:any){
    const res = await httpAxios.post("/api/loging", logingData).then((response)=>response.data);
    return res;
}

export async function currentUser(){
    const res = await httpAxios.get("/api/current").then((response)=>response.data);
  
    return res;
}

export async function logoutUser(){
    const res = await httpAxios.post("/api/logout").then((response)=>response.data);
    return res;
}