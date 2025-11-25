import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className,
  hint 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {hint && !error && (
        <p className="text-sm text-slate-500">
          {hint}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-error-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField