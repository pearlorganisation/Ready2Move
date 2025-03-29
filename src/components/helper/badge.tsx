import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const getBadgeStyle = () => {
    switch (variant) {
      case "success":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getBadgeStyle()}`}>{children}</span>;
}
