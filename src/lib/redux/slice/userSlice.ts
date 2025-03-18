import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../actions/userAction"

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
    }
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
  }
}

const logInUserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
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
            state.userData ={_id:"", 
                            name: '',
                            email: '',
                            phoneNumber: '',
                            role: '',
                            isVerified: ''}
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isError= false
            state.isSuccess= true
            state.isLoading= false
            state.isLoggedIn= true
            state.userData = action.payload.user
        })
    }
})

export default logInUserSlice.reducer