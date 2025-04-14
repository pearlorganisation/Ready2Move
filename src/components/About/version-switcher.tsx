"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface VersionSwitcherProps {
  versions: string[];
  defaultVersion: string;
}

export function VersionSwitcher({
  versions,
  defaultVersion,
}: VersionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(defaultVersion);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectVersion = (version: string) => {
    setSelectedVersion(version);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
      >
        <span>Version: {selectedVersion}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 rounded-md border border-white/10 bg-black/90 py-1 shadow-lg backdrop-blur-sm">
          {versions.map((version) => (
            <button
              key={version}
              onClick={() => selectVersion(version)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                version === selectedVersion ? "text-white" : "text-gray-400"
              }`}
            >
              {version}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
