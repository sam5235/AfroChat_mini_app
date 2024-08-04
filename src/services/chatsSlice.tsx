import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatProps{
    chats: any,
}

const initialState: ChatProps ={
    chats: [],
}

const chatsSlice = createSlice({
    name: "chats",
    initialState: initialState,
    reducers: {
        setChats:(state, action: PayloadAction<{data: any, searchedWord: string}>)=>{
            
        }
    }

});