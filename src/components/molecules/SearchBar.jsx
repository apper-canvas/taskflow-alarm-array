import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className }) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch?.(newValue)
  }

  const handleClear = () => {
    setValue("")
    onSearch?.("")
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <ApperIcon name="Search" className="w-5 h-5 text-slate-400" />
      </div>
      
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-11 pr-10"
      />
      
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar