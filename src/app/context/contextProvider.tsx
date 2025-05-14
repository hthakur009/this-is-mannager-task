"use client"
import { currentUser } from "@/services/UserServices";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});
export function ContextProvider({children}){
    const [user, setUser] = useState(undefined);
    useEffect(()=>{
        async function load(){
            try{
                const tempUser = await currentUser();

                setUser({...tempUser});
            }catch(err){
                    console.log(err);
                setUser(undefined);
            }
      
        }
        load();
    },[])
     return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

