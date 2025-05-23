import { NextRequest, NextResponse } from "next/server"
import { dbConnection } from "@/helper/DBconnection";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";


//all user gets
export async function GET(){
    try{
        await dbConnection();
        const user = await User.find().select("-password");
        return NextResponse.json(user, {status:201});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message:"cannot get data", status:false});
    }
}
//post user data
export  async function POST(request:NextRequest){
   const {name, email, password, about, profile} = await request.json();
   try{
    await dbConnection();
    const user = new User({name, email, password, about, profile});
    user.password = await bcrypt.hash(user.password,10);
    const createUser = await user.save();
    const resposnse = NextResponse.json(createUser, {status:201});

    return resposnse;
   }
   catch(err){
    console.log(err);
    return NextResponse.json( {message:"failed to user create",status:false})
   }
};


