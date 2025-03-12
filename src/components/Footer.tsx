'use client'
import React from 'react'
import Link from "next/link"
import { Play, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react"


const Footer = () => {
  return (
    <div>
      <footer className="bg-[#FFF7E6] pt-8 pb-4 text-gray-700 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <p className="mb-4">
              <span className="font-semibold">Ready2move.co.in</span> is a platform that prioritizes showcasing
              properties that are either ready to move in (Ready2Move) or nearing possession, catering to individuals
              seeking immediate occupancy.
            </p>
            <p className="mb-4">
              Ready2move.co.in provides detailed project information, empowering buyers to make informed decisions based
              on their specific needs and preferences.
            </p>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Play size={18} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram size={18} />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="text-gray-600 mr-2" size={16} />
                <span>+91 9545760001</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-gray-600 mr-2" size={16} />
                <span>admin@ready2move.co.in</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-gray-600 mr-2" size={16} />
                <span>8, SM Residential Complex, Andheri East, Mumbai</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Property In Maharashtra</h3>
              <p className="text-gray-600">Mumbai | Navi Mumbai | Thane | Pune | Palghar</p>
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">Property In UP</h3>
              <p className="text-gray-600">Ayodhya | Lucknow | Varanasi</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Property In Gujarat</h3>
              <p className="text-gray-600">Ahmedabad | Surat | Vadodara | Vapi</p>
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">Property In MP</h3>
              <p className="text-gray-600">Jabalpur | Indore | Bhopal</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Property In Goa</h3>
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">Property In Chhattisgarh</h3>
              <p className="text-gray-600">Raipur</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Property In Delhi</h3>
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">Property In Kerala</h3>
              <p className="text-gray-600">Kochi</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-300 flex justify-center space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-900">Terms and Conditions</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
        </div>
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2">1</span>
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
            </svg>
          </div>
          <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer