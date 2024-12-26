import {createSlice} from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        }
    }
});
export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;