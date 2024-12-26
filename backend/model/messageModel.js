import mongoose from "mongoose";
const messageModel=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,  //create a refernce for the user id
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,  //create a refernce for the user id
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Message = mongoose.model("Message", messageModel);