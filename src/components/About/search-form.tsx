"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function SearchForm() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center rounded-md border bg-white/5 px-3 py-2 transition-all duration-300 ${
          isFocused ? "border-white/30 ring-1 ring-white/10" : "border-white/10"
        }`}
      >
        <Search className="mr-2 h-4 w-4 text-white" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
