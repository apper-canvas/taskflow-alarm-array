import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children,
  variant = "default",
  size = "md",
  className,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-accent-100 text-accent-800",
    error: "bg-error-100 text-error-800",
    high: "bg-error-100 text-error-700 border border-error-200",
    medium: "bg-accent-100 text-accent-700 border border-accent-200",
    low: "bg-primary-100 text-primary-700 border border-primary-200"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge