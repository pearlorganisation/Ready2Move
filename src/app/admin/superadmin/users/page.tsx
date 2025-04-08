"use client"
import { Button } from '@/components/helper/button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook'
import { getAllUser } from '@/lib/redux/actions/authAction'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'

const page = () => {
  const users=useAppSelector((state) => state.auth.users)
  const dispatch= useAppDispatch()

  
  useEffect(()=>{
    dispatch(getAllUser({page:1,limit:10}))
  },[])
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {users?.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">S.no</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
                      </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user._id || index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
     
                <td className="py-2 px-4 border-b">
        {user.isVerified ?"Verified" :"Not verified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (

        <div className="text-center py-4">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
      </div>)}

export default page