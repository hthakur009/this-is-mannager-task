
import mongoose, { connections } from "mongoose";

 let confi:any = 0;
export const dbConnection = async () => {
  if(confi){
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL as any, {
      dbName: "work_manager", 
    });
    console.log("MongoDB connected", connection.connections[0].readyState);
    confi =  connection.connections[0].readyState;
   
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    console.log(err);
  }
};
