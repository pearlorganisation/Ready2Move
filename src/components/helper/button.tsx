// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  data?:string
}

export function Button({ children, variant, size, data,className, ...props }: ButtonProps) {
    return (
      <button
        className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  