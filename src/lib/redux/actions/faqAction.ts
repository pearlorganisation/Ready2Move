import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";




 export const  AddFAQ=createAsyncThunk("create/faq",async(data:  { question: string; answer: string } ,{rejectWithValue})=>{
    try{

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const response=await axiosInstance.post('/api/v1/faqs',data,config)
        return response.data

    }catch(error:any){
toast.error(error?.response.data.message||"failed to add faq")
return rejectWithValue(error.response?.data || error.message);}

}

)


export const  getAllFaqs=createAsyncThunk("get/faq",async(_,{rejectWithValue})=>{
    try{

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const response=await axiosInstance.get('/api/v1/faqs',config)
        return response.data

    }catch(error:any){
toast.error(error?.response.data.message||"failed to add faq")
return rejectWithValue(error.response?.data || error.message);}

}

)

export const  updateFaq=createAsyncThunk("update/faq",async(   { id, updatedata }: { id: string; updatedata: { question: string; answer: string } },{rejectWithValue})=>{
    try{

   
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const response=await axiosInstance.patch(`api/v1/faqs/${id}`,updatedata,config)
        return response.data

    }catch(error:any){
toast.error(error?.response.data.message||"failed to add faq")
return rejectWithValue(error.response?.data || error.message);}

}

)
export  const deleteFaqs=createAsyncThunk("delete/faqs",async(id:string,{rejectWithValue})=>{
try{
const config={
    headers:{
        "Content-Type":"application/json"
    }
}
const{data}=await axiosInstance.delete(`api/v1/faqs/${id}`,config)
return data}
catch(error:any){
    toast.error(error?.response.data.message||"failed to add faq")
    return rejectWithValue(error.response?.data || error.message);}
    
    })