"use client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import SearchBar from "./searchbar";
import banner from "../../assets/city.jpg";
import PropertyCard from "./PropertyCard";

// TypeScript types for props passed into PropertyCard
interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  tags: string[];
}

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="READY2MOVE Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About Us
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-primary">
              Projects
            </Link>
            <Link
              href="/properties"
              className="text-gray-700 hover:text-primary"
            >
              Properties
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-primary">
              Login
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-primary">
              Register
            </Link>
            <Link
              href="/create-listing"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-medium"
            >
              CREATE LISTING
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={banner}
            alt="City skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-red-300/50"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            WELCOME TO READY2MOVE.CO.IN
          </h1>
          <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-12">
            "I will forever believe that buying a home is a great investment.
            Why? Because you can't live in a stock certificate. You can't live
            in a mutual fund." - Oprah Winfrey
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Discover Our Featured Listings
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
            There are many variations of passages of Lorem Ipsum available but
            the this in majority have suffered alteration in some.
          </p>

          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <button className="text-blue-500 hover:text-blue-700">
                Prev
              </button>
              <button className="text-blue-500 hover:text-blue-700">
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCard
              image=""
              title="NCC Urban Lake Springs in JP Nagar"
              location="ncc urban lake springs"
              price="Rs 1.6 Cr Onwards"
              bedrooms="3 & 3.5 BHK"
              bathrooms="3"
              area="1622 - 2168 Sq Ft"
              tags={["PRE-LAUNCH PROPERTY", "LAUNCH OFFER"]}
            />

            <PropertyCard
              image="/placeholder.svg?height=300&width=400"
              title="Provident Botanico in Whitefield"
              location="Provident Botanico (u/c), Kacharakanahalli"
              price="Rs 86 Lacs Onwards"
              bedrooms="2 & 3 BHK"
              bathrooms="2 & 3"
              area="986-1494 Sq Ft"
              tags={["PRE-LAUNCH PROPERTY", "FOR SALE"]}
            />

            <PropertyCard
              image="/placeholder.svg?height=300&width=400"
              title="Gina Artize in Bommasandra"
              location="RK Township, Yarandahalli, Hyarandahalli"
              price="Rs 45 Lacs Onwards"
              bedrooms="1, 2 & 3BHK"
              bathrooms="1 & 2"
              area="703 - 1346 Sq Ft"
              tags={["READY TO MOVE IN PROPERTY", "FOR SALE"]}
            />
          </div>
        </div>
      </section>

      {/* Chat Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            1
          </span>
          <MessageCircle size={24} />
        </div>
        <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
          <MessageCircle size={24} />
        </div>
      </div>
    </div>
  );
}
