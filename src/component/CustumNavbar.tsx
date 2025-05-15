"use client";
import { UserContext } from "@/app/context/contextProvider";
import { logoutUser } from "@/services/UserServices";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

export function Navbar() {
  const { user, setUser } = useContext(UserContext);
  

  async function logoutHandle(){
    try{
      const res = await logoutUser();
      console.log(res);
      setUser(undefined);
      toast.success("succefuly logged out!!", {position:"top-center"});
    }catch(err){
      console.log(err);
      toast.error("something went wrong!!");
    }
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand */}
          <div className="flex-shrink-0 text-xl font-bold">
            <Link href="/">Work Manager</Link>
          </div>

          {/* Main Navigation */}
          <div className="flex space-x-4">
          
            {user && user._id && (
              <>
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/addTask" className="hover:text-gray-300">Add Task</Link>
                <Link href="/showTask" className="hover:text-gray-300">Show Task</Link>
              </>
            )}
          </div>

          {/* Auth Links */}
          <div className="flex space-x-4">
            {!user || !user._id ? (
              <>
                <Link href="/singup" className="hover:text-gray-300 flex gap-1">Signup<FaUserTie /></Link>
                <Link href="/loginPage" className="hover:text-gray-300">Login</Link>
              </>
            ) : (
              <button onClick={logoutHandle} className="hover:text-gray-300 flex gap-1">Logout<FaRegUser /></button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
