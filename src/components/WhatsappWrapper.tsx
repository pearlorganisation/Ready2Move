"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWrapper() {
  const pathname = usePathname();

   if (pathname.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "919545760001";  
  const message = encodeURIComponent("Hello, I would like to know more about Ready2Move!");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
