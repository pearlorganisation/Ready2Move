"use client"

import DeleteModal from "@/components/DeletedModal"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { AddFAQ, deleteFaqs, getAllFaqs, updateFaq } from "@/lib/redux/actions/faqAction"
import { Pencil, Trash, Trash2 } from "lucide-react"
import type React from "react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"



interface FAQ {
  id: string
  question: string
  answer: string
  dateUpdated: string
  _id:string
}

export default function FAQManagement() {
  // const [faqs, setFaqs] = useState<FAQ[]>([
  //   {
  //     id: "1",
  //     question: "how are you !!!",
  //     answer: "Every thing is fine",
  //     dateUpdated: "3/21/2025",
  //   },
  //   {
  //     id: "2",
  //     question: "How do I reset my password?",
  //     answer: "Click on 'Forgot Password' at the login screen and foll...",
  //     dateUpdated: "4/7/2025",
  //   },
  //   {
  //     id: "3",
  //     question: "How do I reset my pasfdsjflk ?",
  //     answer: "Click on 'Forgot Password' at thdsfdsfdsge login scree...",
  //     dateUpdated: "5/7/2025",
  //   },
  // ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const[deleteModal,setDeletemodal]=useState<boolean>(false)
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null)
const[Id,setID]=useState<string>("")
  // Form states
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")


  // const filteredFaqs = faqs.filter(
  //   (faq) =>
  //     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  const {faqs} = useAppSelector((state) => state.FAQ);
  
  console.log("fgggg",faqs)
  const dispatch=useAppDispatch()
  useEffect(()=>{
    dispatch(getAllFaqs())
  },[])

  const handleAddFaq = (data:{ question: string; answer: string }) => {
    // data.question, data.answer
    dispatch(AddFAQ(data)).then((res) => {
        toast.success("FAQ added successfully!");
        setShowAddModal(false);
     if(res.payload.success==true){
      dispatch(getAllFaqs())
     }
      })
      .catch(() => {
        toast.error("Failed to add FAQ");
      });
  };
  



  const handleDeleteFaq = () => {

    dispatch(deleteFaqs(Id)).then((res)=>{
      if(res.payload.success==true){
        dispatch(getAllFaqs())
      }
    })
    setDeletemodal(false)
  }
    
  

  const confirmDelete = (id: string) => {
    setID(id);
    setDeletemodal(true);
  };
  
  const onclose=()=>{
    setDeletemodal(false)
  }

  
  
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ question: string; answer: string }>();
  
  const openEditModal = (faq:any) => {
    setCurrentFaq(faq);
    setValue("question", faq.question);
    setValue("answer", faq.answer);
    setShowEditModal(true);
  };
  
  const onSubmit = (data: { question: string; answer: string }) => {
    if (currentFaq) {
      
      const updatedFaq = {
    
        question: data.question,
        answer: data.answer,
      };
   
      dispatch(updateFaq({id:currentFaq._id,updatedata:updatedFaq})).then((res)=>{
        if(res.payload.success){
          dispatch(getAllFaqs())

        }
      })
      setShowEditModal(false);
    }
  };

  const openAddModal = () => {
    setNewQuestion("")
    setNewAnswer("")

    setShowAddModal(true)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center"
        >
          <span className="mr-1">+</span> Add New FAQ
        </button>
      </div>

      <div className="mb-6">
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 rounded-md"
          />
          <svg
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="py-2 px-4 font-medium text-gray-600">Question</th>
              <th className="py-2 px-4 font-medium text-gray-600">Answer</th>
              <th className="py-2 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(faqs) &&
    faqs.map((faq) => (
      <tr key={faq._id} className="border-b border-gray-200">
        <td className="py-4 px-4">{faq.question}</td>
        <td className="py-4 px-4">{faq.answer}</td>
        {/* <td className="py-4 px-4">{faq.dateUpdated}</td> */}

        <td className="py-4 px-4 flex space-x-2">
          <button onClick={() => openEditModal(faq)} className="text-gray-600 hover:text-gray-900">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => confirmDelete(faq._id)} className="text-red-500 hover:text-red-700">
            <Trash className="h-4 w-4" />
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New FAQ</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="text-gray-500 mb-4">Create a new frequently asked question and answer.</p>

            <form onSubmit={handleSubmit(handleAddFaq)} className="space-y-4">
  <div>
    <label className="block text-sm font-medium mb-1">Question</label>
    <input
      type="text"
      placeholder="Enter the question"
      {...register("question", { required: "Question is required" })}
      className={`w-full p-2 border rounded-md ${errors.question ? "border-red-500" : "border-gray-300"}`}
    />
    {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>}
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Answer</label>
    <textarea
      placeholder="Enter the answer"
      {...register("answer", { required: "Answer is required" })}
      className={`w-full p-2 border rounded-md min-h-[100px] ${errors.answer ? "border-red-500" : "border-gray-300"}`}
    />
    {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
  </div>

  <div className="flex justify-end space-x-2 pt-2">
    <button
      type="button"
      onClick={() => setShowAddModal(false)}
      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
    >
      Cancel
    </button>
    <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
      Add FAQ
    </button>
  </div>
</form>

          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">Edit FAQ</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Question</label>
          <input
            {...register("question", { required: "Question is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Answer</label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
          {errors.answer && (
            <p className="text-red-500 text-sm">{errors.answer.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}




{
  deleteModal&&(<DeleteModal isOpen={deleteModal}
    onClose={onclose}
    onDelete={handleDeleteFaq}/>)
}
    </div>
  )
  }
