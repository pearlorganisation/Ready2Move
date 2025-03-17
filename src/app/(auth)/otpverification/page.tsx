"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook';
import { verifyOtp } from '@/lib/redux/actions/otpAction';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const VerificationPage = () => {
  const dispatch = useAppDispatch()
  const { isSuccess, isError, isLoading} = useAppSelector(state=> state.otp)
  const router = useRouter()
  interface FormData {
    otp: number;
    email: string;
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data:FormData) => {
     dispatch(verifyOtp(data))
     console.log(data);  
  };

  useEffect(()=>{
    if(isSuccess){
       router.push("/",{scroll:true})
    }
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Verification</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"  
              id="otp"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,  // Adjust minLength as needed for your OTP length
                  message: "OTP must be at least 4 characters", //and message
                },
                 maxLength: {
                  value: 8,  // Adjust maxLength as needed for your OTP length
                  message: "OTP must be at most 8 characters",
                },
                pattern: {
                    value: /^[0-9]+$/, // Ensure OTP contains only numbers
                    message: "OTP must contain only numbers",
                  },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter OTP"
            />
            {errors.otp && <p className="text-red-500 text-xs mt-1">{String(errors.otp.message)}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;