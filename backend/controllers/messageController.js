import { Conversation } from "../model/conversationModel.js";
import {Message} from "../model/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

 export const sendMessage = async (req,res)=>{
    try{
         const senderId = req.id; //login person's id that we have given in reg.id
         //thats y we use middleware that works between request and responce
         const receiverId = req.params.id; 
         const {message} = req.body;
         if (!message) {
            return res.status(400).json({ error: "Message content is required." }); // Validation check added
        }

         let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId,receiverId]},
         });
         //if u don't have a conversion then create a new one
         if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
         };
         const newMessage = await Message.create({
            senderId,
            receiverId,
            message
         });
         if (!newMessage) {
            console.error("Failed to create new message.");
            return res.status(500).json({ error: "Failed to create new message." });
        }
         if(newMessage){
            gotConversation.messages.push(newMessage._id);
         };
         await Promise.all([gotConversation.save(), newMessage.save()]);
         
         // SOCKET IO
         const receiverSocketId = getReceiverSocketId(receiverId);
         if(receiverSocketId){
             io.to(receiverSocketId).emit("newMessage", newMessage);
         }
         return res.status(201).json({
             newMessage
         })
     }catch(error){
        console.log(error);
        return res.status(500).json({ error: "An error occurred while sending the message." });
 
    }
 };

 export const getMessage = async (req,res)=>{
    try{
       const receiverId = req.params.id;
       const senderId = req.id;
       const conversation = await Conversation.findOne({
         participants:{$all : [senderId,receiverId]}
       }).populate("messages");
       if (!conversation) {
         return res.status(200).json([]);
     }

     return res.status(200).json(conversation?.messages);
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "An error occurred while retrieving messages." });
  
    }
 }