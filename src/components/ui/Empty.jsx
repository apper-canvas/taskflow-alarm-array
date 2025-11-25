import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with organizing your work",
  icon = "CheckCircle",
  actionText = "Add Task",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-700 mb-3">
        {title}
      </h3>
      
      <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="animate-fade-in"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty