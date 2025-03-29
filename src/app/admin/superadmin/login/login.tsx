"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";

import { loginUser } from "@/lib/redux/actions/authAction";
import { useAppDispatch } from "@/lib/hooks/dispatchHooks";


export default function LoginPage() {
  const router = useRouter();

  const dispatch = useAppDispatch()
  // const {data} = useAppSelector(state=> state.auth)
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // Redirect to dashboard if already logged in
  const onSubmit = async (data) => {

      const response = await dispatch(loginUser(data)).unwrap().then(  router.push("/dashboard")); 
      console.log("Login Response:", response); // Debugging output
  
      // if (response && response.data.user.isVerified === true) { 
      //   console.log("Redirecting to dashboard..."); // Debugging message
        
      // }
    
  };
  
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section - Image */}
      <div className="hidden md:flex w-1/2 relative">
        <img src="city.jpg" alt="Real Nest" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-6 text-white">
          <h2 className="text-xl font-bold">Manage Properties Efficiently</h2>
          <p className="text-sm">
            Easily track rent payments, maintenance requests, and tenant communications in one place.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-20 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Welcome Back to Real Nest!</h1>
        <p className="text-gray-500">Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: "Email is required" })}
              className={`w-full p-3 pl-10 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Mail className="absolute left-3 top-3 text-gray-400" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={`w-full p-3 pl-10 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Lock className="absolute left-3 top-3 text-gray-400" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
