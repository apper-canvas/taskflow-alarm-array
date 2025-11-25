import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  className,
  size = "md",
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  }

  return (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "flex items-center justify-center border-2 rounded cursor-pointer transition-all duration-200 checkbox-scale",
          sizes[size],
          checked 
            ? "bg-primary-600 border-primary-600 text-white" 
            : "bg-white border-slate-300 hover:border-slate-400",
          className
        )}
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={iconSizes[size]} 
            className="text-white animate-scale-in" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox