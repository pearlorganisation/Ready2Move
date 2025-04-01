// components/ui/card.tsx
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`rounded-lg border bg-white shadow-sm p-4 ${className}`}>{children}</div>
  }
  
  export function CardHeader({ children , className}: { children: React.ReactNode; className?:string }) {
    return <div className="border-b pb-2 mb-2">{children}</div>
  }
  
  export function CardTitle({ children, className }: { children: React.ReactNode; className?:string }) {
    return <h2 className="text-lg font-semibold">{children}</h2>
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>
  }
  
  export function CardDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-gray-500">{children}</p>
  }
  