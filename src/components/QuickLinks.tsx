"use client";

import React from "react";

const QuickLinks = () => {
  return (
    <div className="text-white px-4">
      <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="/about" className="hover:text-gray-300">
            About Us
          </a>
        </li>
        <li>
          <a href="/privacy-policy" className="hover:text-gray-300">
            Privacy Policy
          </a>
        </li>

        <li>
          <a href="/terms-condition" className="hover:text-gray-300">
            Terms and Conditions
          </a>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
