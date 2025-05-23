import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:String,
    email:{type:String,unique:true},
    password:{type:String, require:true},
    about:String,
    profile:String
});

export const User = mongoose.models.users || mongoose.model("users", userSchema);