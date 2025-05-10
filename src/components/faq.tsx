"use client"

import type React from "react"

import { useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
interface FAQ {
  id: string
  question: string
  answer: string
  dateUpdated: string
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "how are you !!!",
      answer: "Every thing is fine",
      dateUpdated: "3/21/2025",
    },
    {
      id: "2",
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' at the login screen and foll...",
      dateUpdated: "4/7/2025",
    },
    {
      id: "3",
      question: "How do I reset my pasfdsjflk ?",
      answer: "Click on 'Forgot Password' at thdsfdsfdsge login scree...",
      dateUpdated: "5/7/2025",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null)

  // Form states
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [questionError, setQuestionError] = useState("")
  const [answerError, setAnswerError] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const validateForm = () => {
    let isValid = true

    if (newQuestion.trim().length < 3) {
      setQuestionError("Question must be at least 3 characters")
      isValid = false
    } else {
      setQuestionError("")
    }

    if (newAnswer.trim().length < 3) {
      setAnswerError("Answer must be at least 3 characters")
      isValid = false
    } else {
      setAnswerError("")
    }

    return isValid
  }

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const today = new Date()
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
      dateUpdated: formattedDate,
    }

    setFaqs([...faqs, newFaq])
    setShowAddModal(false)
    setNewQuestion("")
    setNewAnswer("")
  }

  const handleEditFaq = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !currentFaq) return

    const today = new Date()
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

    const updatedFaqs = faqs.map((faq) =>
      faq.id === currentFaq.id ? { ...faq, question: newQuestion, answer: newAnswer, dateUpdated: formattedDate } : faq,
    )

    setFaqs(updatedFaqs)
    setShowEditModal(false)
    setCurrentFaq(null)
  }

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))
  }

  const openEditModal = (faq: FAQ) => {
    setCurrentFaq(faq)
    setNewQuestion(faq.question)
    setNewAnswer(faq.answer)
    setQuestionError("")
    setAnswerError("")
    setShowEditModal(true)
  }

  const openAddModal = () => {
    setNewQuestion("")
    setNewAnswer("")
    setQuestionError("")
    setAnswerError("")
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
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full p-2 border border-gray-300 rounded-md"
          />
         
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-red-700">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="py-2 px-4 font-medium text-gray-600">Question</th>
              <th className="py-2 px-4 font-medium text-gray-600">Answer</th>
              <th className="py-2 px-4 font-medium text-gray-600">Date Updated</th>
              <th className="py-2 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.map((faq) => (
              <tr key={faq.id} className="border-b border-gray-200">
                <td className="py-4 px-4">{faq.question}</td>
                <td className="py-4 px-4">{faq.answer}</td>
                <td className="py-4 px-4">{faq.dateUpdated}</td>
                <td className="py-4 px-4 flex space-x-2">
                <button onClick={() => handleDeleteFaq(faq.id)} className="bg-red-500 hover:text-red-700">
</button>
<Trash2 />
                  <button onClick={() => handleDeleteFaq(faq.id)} className="bg-red-500 hover:text-red-700">
                
                  </button>
                  <Trash2/>
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

            <form onSubmit={handleAddFaq} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input
                  type="text"
                  placeholder="Enter the question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className={`w-full p-2 border rounded-md ${questionError ? "border-red-500" : "border-gray-300"}`}
                />
                {questionError && <p className="text-red-500 text-sm mt-1">{questionError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Answer</label>
                <textarea
                  placeholder="Enter the answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className={`w-full p-2 border rounded-md min-h-[100px] ${
                    answerError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {answerError && <p className="text-red-500 text-sm mt-1">{answerError}</p>}
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
      {showEditModal && currentFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit FAQ</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="text-gray-500 mb-4">Update the question and answer.</p>

            <form onSubmit={handleEditFaq} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className={`w-full p-2 border rounded-md ${questionError ? "border-red-500" : "border-gray-300"}`}
                />
                {questionError && <p className="text-red-500 text-sm mt-1">{questionError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Answer</label>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className={`w-full p-2 border rounded-md min-h-[100px] ${
                    answerError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {answerError && <p className="text-red-500 text-sm mt-1">{answerError}</p>}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
