import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 btn-click focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 focus:ring-slate-500",
    outline: "bg-transparent hover:bg-slate-50 text-slate-600 border border-slate-300 hover:border-slate-400 focus:ring-slate-500",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-500",
    danger: "bg-error-500 hover:bg-error-600 text-white shadow-md hover:shadow-lg focus:ring-error-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg"
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button