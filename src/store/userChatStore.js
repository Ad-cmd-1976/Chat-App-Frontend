import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

export const userChatStore=create((set)=>({
    users:[],
    messages:[],
    selectedUser:null,
    isMessagesLoading:false,
    isUsersLoading:false,

    getUsers:async ()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get('/message/users');
            set({users:res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },

    getMessages: async (user_id)=>{
        set({isMessagesLoading:true});
        try{
            const res=await axiosInstance.put(`/message/:${user_id}`);
            set({messages:res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },

    setselectedUser:(selectedUser)=>set({selectedUser})
}))