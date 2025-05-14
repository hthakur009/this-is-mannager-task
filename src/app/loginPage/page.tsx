'use client'
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/UserServices";
import { useState } from "react";
import { toast } from "react-toastify";

export default  function Login(){
     const router = useRouter();
     const [data, setData] = useState({
            email:"",
            password:"",
        });

       async function LoginHandlar(event:any){
   
            event.preventDefault();
            console.log(data);
            try{
              const result = await loginUser(data);
              console.log(result);
              toast.success("logged In", {position:"top-center"});
              router.push("/showTask");
            }catch(err:any){
              console.log(err);
              toast.error(err.response.data.message, {position:"top-center"});
            }
        }
    return(
        <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-md rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login an Account</h2>
    
          <form  className="space-y-5" onSubmit={LoginHandlar}>
        
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(event)=>{
                    setData({
                        ...data,
                        email:event.target.value
                    })
                }}
                value={data.email}
              />
            </div>
    
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(event)=>{
                    setData({
                        ...data,
                        password:event.target.value
                    })
                }}
                value={data.password}
              />
            </div>
    
    
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

    )
}