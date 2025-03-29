  // components/ui/label.tsx
  export function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
      <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
        {children}
      </label>
    )
  }