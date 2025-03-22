"use client";
import Image from "next/image";
import { Heart, Maximize2, Info } from "lucide-react";
import building1 from "../../assets/building1.jpeg"; // Import fallback image

// Define the types for the component props
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

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  tags,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Use fallback image if `image` prop is empty */}
        <Image
          src={image || building1} // Use fallback image when `image` is an empty string or invalid
          alt={title}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs font-semibold px-2 py-1 rounded ${
                tag.includes("PRE-LAUNCH")
                  ? "bg-gray-800"
                  : tag.includes("LAUNCH OFFER")
                  ? "bg-green-700"
                  : tag.includes("FOR SALE")
                  ? "bg-blue-700"
                  : tag.includes("READY TO MOVE")
                  ? "bg-teal-700"
                  : "bg-gray-700"
              } text-white`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md font-semibold">
          {price}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <Maximize2 size={18} className="text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <Heart size={18} className="text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <Info size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{location}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Bedrooms</p>
            <p className="font-medium">{bedrooms}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Bathrooms</p>
            <p className="font-medium">{bathrooms}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 mb-1">Area</p>
            <p className="font-medium">{area}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
