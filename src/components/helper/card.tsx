export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm p-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-b pb-2 mb-2 ${className}`}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-2 ${className}`}>{children}</div>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}
