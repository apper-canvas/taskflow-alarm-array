import Badge from "@/components/atoms/Badge"

const PriorityBadge = ({ priority, className }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return { variant: "high", label: "High" }
      case "medium":
        return { variant: "medium", label: "Medium" }
      case "low":
        return { variant: "low", label: "Low" }
      default:
        return { variant: "default", label: "Normal" }
    }
  }

  const config = getPriorityConfig(priority)

  return (
    <Badge 
      variant={config.variant} 
      size="sm" 
      className={className}
    >
      {config.label}
    </Badge>
  )
}

export default PriorityBadge