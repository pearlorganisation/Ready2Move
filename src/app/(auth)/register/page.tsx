"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/lib/redux/actions/authAction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
enum AccountType {
  AGENT = "AGENT",
  BUILDER = "BUILDER",
  USER = "USER",
}

// Password validation function
const getPasswordErrors = (password: string) => {
  const errors = [];
  if (!/[a-z]/.test(password)) errors.push("1 lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("1 number");
  if (!/[\W_]/.test(password)) errors.push("1 special character");
  if (password.length < 8) errors.push("Minimum 8 characters");
  return errors;
};

// Validation Schema
const schema = yup.object().shape({
  role: yup
    .string()
    .oneOf(Object.values(AccountType), "Invalid account type")
    .required("Account Type is required"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .test("password-strength", "Password must meet all criteria", (value) => {
      return value ? getPasswordErrors(value).length === 0 : false;
    }),
});

const RegisterPage = () => {
  const dispatch =  useAppDispatch()
 const { isSuccess, isError, isLoading } = useAppSelector((state) => state.auth);
 console.log("the states are", isSuccess, isError, isLoading)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password", ""); // Watch password field

  const onSubmit = (data: any) => {
    dispatch(registerUser(data))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-blue-500">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDY_U-8UPH2q-AKgA3mTRhzHVtl9FF7VrICQ&s"
            alt="Register"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Account Type
              </label>
              <select
                {...register("role")}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Account Type</option>
                {Object.values(AccountType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                {passwordValue && (
                  <ul className="text-xs text-gray-600 mt-2">
                    {getPasswordErrors(passwordValue).map((err, idx) => (
                      <li key={idx} className="text-red-500">
                        ❌ {err}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
