"use client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import SearchBar from "./searchbar";
import banner from "../../assets/city.jpg";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { useEffect } from "react";
import { getBanner } from "@/lib/redux/actions/bannerAction";

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
  const dispatch = useAppDispatch();
  const { bannerData } = useAppSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanner());
  }, []);
  console.log("the banner data is", banner);
  return (
    <div className="min-h-screen flex flex-col mt-6">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerData?.[0]?.bgImage?.secure_url}
            alt="City skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-red-300/50"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {bannerData?.[0]?.headline}
          </h1>
          <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-12">
            {bannerData?.[0]?.quote}
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
