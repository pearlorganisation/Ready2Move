import { createSlice } from "@reduxjs/toolkit"
import { fetchCurrentUser, loginUser, logout, updateUser } from "../actions/userAction"

interface UserUpdated{
    isSuccess:boolean,
    isError:boolean,
    isLoading:boolean
}

interface Login {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    isLoggedIn: boolean,
    userData: {
        _id: string,
        name: string,
        email: string,
        phoneNumber: string,
        role: string,
        isVerified: string
    },
    users:{},
    isUserUpdated:UserUpdated
}
const initialState: Login={
  isLoading: false,
  isSuccess:false,
  isError:false,
  isLoggedIn:false,
  userData: {
    _id:"",
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    isVerified: ''
  },
  users:{},
  isUserUpdated:{
    isLoading:false,
    isSuccess:false,
    isError:false
  }
}

const logInUserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        resetLogin: (state)=>{
            state.isSuccess = false
            state.isLoading= false
            state.isError=false
        },
        logoutUser : (state)=>{
            state.isSuccess = false
            state.isLoading= false
            state.isLoggedIn= false
            state.isError = false
            state.userData ={
                    _id:"",
                    name: '',
                    email: '',
                    phoneNumber: '',
                    role: '',
                    isVerified: ''
            },
            state.users={}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,state=>{
            state.isLoading=true
            state.isSuccess= false
            state.isError= false
            state.isLoggedIn= false
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isError= true
            state.isSuccess= false
            state.isLoading= false
            state.isLoggedIn= false
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isError= false
            state.isSuccess= true
            state.isLoading= false
            state.isLoggedIn= true
            // state.userData = action.payload.user
        })
        .addCase(updateUser.pending,state=>{
            state.isError=false
            state.isLoading= true
            state.isSuccess= true
        })
        .addCase(updateUser.rejected,state=>{
            state.isError=true
            state.isLoading=false
            state.isSuccess=false
        })
        .addCase(updateUser.fulfilled,state=>{
            state.isLoading=false
            state.isSuccess= true
            state.isError=false
        })
        .addCase(fetchCurrentUser.pending,state=>{
            state.isLoading = true
            state.isSuccess= false
            state.isError= false 
        })
        .addCase(fetchCurrentUser.rejected,state=>{
            state.isSuccess= false
            state.isError=true
            state.isLoading=false
            state.userData ={
                    _id:"", 
                    name: '',
                    email: '',
                    phoneNumber: '',
                    role: '',
                    isVerified: ''
                }
        })
        .addCase(fetchCurrentUser.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isError= false
            state.isSuccess= true
            state.userData = action.payload.data
        })
        .addCase(logout.pending,state=>{
            state.isLoading= true
        })
        .addCase(logout.rejected,state=>{
            state.isError= true
        })
        .addCase(logout.fulfilled,state=>{
            state.isError=false
            state.isLoading= false
            state.isSuccess= true
        })
     }
})

export const { resetLogin, logoutUser } = logInUserSlice.actions
export default logInUserSlice.reducer
