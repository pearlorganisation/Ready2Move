import React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse">{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-200">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y">{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>;
}


export function TableHead({ children, className }: { children: React.ReactNode; className?: string | undefined }) {
  return <th className="p-2 text-left font-medium text-gray-700">{children}</th>;
}

export function TableCell({ children, className }: { children: React.ReactNode, className?:string |undefined }) {
  return <td className="p-2">{children}</td>;
}

export function  TabsTrigger({ children }: { children: React.ReactNode }) {
    return <tr className="border-b">{children}</tr>;
  }
  export function TabsList({children}:{children:React.ReactNode}){
    return <tr className="border-b">{children}</tr>
  }
  
  export function  TabsContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>;
  }
  export function  Tabs({ children }: { children: React.ReactNode }) {
    return <div className="border-b">{children}</div>;
  }