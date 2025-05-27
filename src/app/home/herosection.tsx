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
import { fetchCurrentUser } from "@/lib/redux/actions/userAction";

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
  const { isLoggedIn } = useAppSelector(state=> state.user)
  useEffect(() => {
    dispatch(getBanner());
  }, []);
  useEffect(()=>{
     if(isLoggedIn){
      dispatch(fetchCurrentUser())
     }
  },[])
  console.log("the banner data is", banner);
  return (
    <div className="flex flex-col">
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
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center lg:mt-96 shadow-xl/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-100 to-blue-50 bg-clip-text text-transparent">
  {bannerData?.[0]?.headline}
</h1>
          <p className="text-white text-lg md:text-xl max-w-4xl mx-auto mb-12">
            {bannerData?.[0]?.quote}
          </p>

          <SearchBar />
        </div>
      </section>
    </div>
  );
}
