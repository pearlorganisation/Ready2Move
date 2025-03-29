"use client"
import React, { useState } from "react";

interface SelectProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

export function Select({ children, onChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return <div className="relative">{React.Children.map(children, (child) => React.cloneElement(child as any, { selectedValue, handleChange }))}</div>;
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <div className="border p-2 rounded-md cursor-pointer">{children}</div>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="absolute mt-2 w-full bg-white border rounded-md shadow-md">{children}</div>;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  selectedValue?: string;
  handleChange?: (value: string) => void;
}

export function SelectItem({ value, children, selectedValue, handleChange }: SelectItemProps) {
  return (
    <div
      className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedValue === value ? "font-bold" : ""}`}
      onClick={() => handleChange && handleChange(value)}
    >
      {children}
    </div>
  );
}

export function SelectValue({ selectedValue }: { selectedValue?: string }) {
  return <span>{selectedValue || "Select an option"}</span>;
}
