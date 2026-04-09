"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Play,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllCityData } from "@/lib/redux/actions/footerAction";
import QuickLinks from "./QuickLinks";
import { FaQuora } from "react-icons/fa";

const Footer = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { projectsCityWithLocality, propertiesCityWithLocality } =
    useAppSelector((state) => state.footer);

  console.log(
    "pro",
    projectsCityWithLocality,
    "property",
    propertiesCityWithLocality
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCityData({ limit: 10 }));
  }, []);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

const LOCALITY_LIMIT = 5;
const LIMITED_CITY_COUNT = 2;




  return (
    <div>
      <footer className="bg-black text-white py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo Column */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Ready2Move</h2>
              <p className="text-sm text-gray-300 mb-6">
                Ready2move.co.in is a platform that prioritizes showcasing
                properties that are either ready to move in (Ready2Move) or
                nearing possession, catering to individuals seeking immediate
                occupancy.
              </p>
              <p className="text-sm text-gray-300 mb-6">
                Ready2move.co.in provides detailed project information,
                empowering buyers to make informed decisions based on their
                specific needs and preferences.
              </p>
              <div className="flex space-x-4 mb-6">
                {/* Facebook */}
                <Link
                  href="https://www.facebook.com/ready2move.co.in"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <Facebook className="w-5 h-5" />
                </Link>

                {/* YouTube */}
                <Link
                  href=" https://www.youtube.com/@ready2move.mumbai"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <Youtube className="w-5 h-5" />
                </Link>

                {/* Instagram */}
                <Link
                  href=" https://www.instagram.com/ready2move.co.in/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <Instagram className="w-5 h-5" />
                </Link>

                {/* LinkedIn */}
                <Link
                  href="https://linkedin.com/company/ready2move1/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>

                {/* Twitter */}
                <Link
                  href="https://x.com/ready2move_mbai"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <Twitter className="w-5 h-5" />
                </Link>

                {/* Quora (custom text/icon) */}
                <Link
                  href="https://www.quora.com/profile/Ready2move"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  <FaQuora className="w-5 h-5" />
                </Link>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>+91 9545760001</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>admin@ready2move.co.in</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    1, A Wing, Neel Laxmi CHSKL, Off Shahaji Raje Road, Vile
                    Parle east Mumbai 400057
                  </span>
                </div>
              </div>
            </div>

            {/* Property In Maharashtra Column */}
            {/* Change starting at line 115 */}
            <div>
             <div>
  {projectsCityWithLocality
    ?.slice(0, LIMITED_CITY_COUNT)
    .map((item, i) => {
      const uniqueLocalities = [
        ...new Set(item.localities || []),
      ].slice(0, LOCALITY_LIMIT);

      return (
        <div key={i} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Project In {item.city}
          </h3>

          <ul className="space-y-3">
            {uniqueLocalities.map((locality, index) => (
              <li key={index}>
                <Link
                  href={`/projects?locality=${locality}`}
                  className="hover:text-gray-300"
                >
                  {locality}
                </Link>
              </li>
            ))}
          </ul>

          {/* Optional View More */}
          {item.localities?.length > LOCALITY_LIMIT && (
            <Link
              href={`/projects?city=${item.city}`}
              className="text-sm text-gray-400 hover:text-white"
            >
              View More →
            </Link>
          )}
        </div>
      );
    })}
</div>
            </div>

           <div>
  {propertiesCityWithLocality
    ?.slice(0, LIMITED_CITY_COUNT)
    .map((item, i) => {
      const uniqueLocalities = [
        ...new Set(item.localities || []),
      ].slice(0, LOCALITY_LIMIT);

      return (
        <div key={i} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Property In {item.city}
          </h3>

          <ul className="space-y-3">
            {uniqueLocalities.map((locality, index) => (
              <li key={index}>
                <Link href={`/properties?locality=${locality}`}>
                  {locality}
                </Link>
              </li>
            ))}
          </ul>

          {item.localities?.length > LOCALITY_LIMIT && (
            <Link
              href={`/properties?city=${item.city}`}
              className="text-sm text-gray-400 hover:text-white"
            >
              View More →
            </Link>
          )}
        </div>
      );
    })}
</div>

            <div>
              <QuickLinks />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white">
                  All Rights Reserved. © Copyright 2025
                  <a
                    href="https://ready2move.co.in/"
                    className="text-white  hover:text-gray-400"
                    target="_self"
                  >
                    {" "}
                    Ready2Move
                  </a>{" "}
                  Powered By
                  <a
                    href="https://www.pearlorganisation.com/"
                    className="text-white  hover:text-gray-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Pearl Organisation
                  </a>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="relative">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-1 hover:text-gray-300"
                  >
                    <span>English</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isLanguageOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded shadow-lg py-2 w-40 z-10">
                      <ul>
                        {/* <li>
                        <button className="px-4 py-1 w-full text-left hover:bg-gray-700">English</button>
                      </li> */}
                        <li>
                          <button className="px-4 py-1 w-full text-left hover:bg-gray-700">
                            Hindi
                          </button>
                        </li>
                        {/* <li>
                        <button className="px-4 py-1 w-full text-left hover:bg-gray-700">Marathi</button>
                      </li>
                      <li>
                        <button className="px-4 py-1 w-full text-left hover:bg-gray-700">Gujarati</button>
                      </li> */}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
