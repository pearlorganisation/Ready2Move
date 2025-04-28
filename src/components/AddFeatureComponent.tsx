"use client"

import { SubmitHandler, useForm } from "react-hook-form"

export interface  FeatureData{
    type: string
    name: string
}
const AddFeatureComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeatureData>({
    defaultValues: {
      type: "",
      name: "",
    },
  })

  const onSubmit:SubmitHandler<FeatureData> = (data) => {
    console.log("Form submitted:", data)
    reset() // Reset form after successful submission
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Feature</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Type Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input
            type="text"
            {...register("type", { required: "Type is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter feature type"
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter feature name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddFeatureComponent
