"use client"
import { userSignup } from "@/services/UserServices";
import { useState } from "react";
import { toast } from "react-toastify";

export default  function SignupPage(){
    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        about:"",
        profile:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
    });
    async function DataSignup(event:any){
            event.preventDefault();
            console.log(data);
            try{
                await userSignup(data);
                toast.success("User added succefuly",{position:"top-center"});
                setData({
                    name:"",
                    email:"",
                    password:"",
                    about:"",
                    profile:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                });
            }catch(err){
                toast.warn("Feild user added")
            }
    }
    return (
        <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-md rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
    
          <form  className="space-y-5" onSubmit={DataSignup}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(event)=>{
                    setData({
                        ...data,
                        name:event.target.value
                    })
                }}
                value={data.name}
              />
            </div>
    
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
    
            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea
                id="about"
                name="about"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us a bit about yourself..."
                onChange={(event)=>{
                    setData({
                        ...data,
                        about:event.target.value
                    })
                }}
                value={data.about}
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
      );
}