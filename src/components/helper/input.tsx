// components/ui/input.tsx
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`border px-3 py-2 rounded-md w-full ${className}`} {...props} />
  }
  
