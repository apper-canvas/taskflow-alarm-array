import { useState } from "react"
import { format, isAfter, isToday, isPast } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const [showDescription, setShowDescription] = useState(false)

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null
    
    const due = new Date(dueDate)
    if (isPast(due) && !isToday(due)) return "overdue"
    if (isToday(due)) return "today"
    return "upcoming"
  }

  const dueDateStatus = getDueDateStatus(task.dueDate)

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null
    
    const due = new Date(dueDate)
    if (isToday(due)) return "Today"
    return format(due, "MMM dd")
  }

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm border border-slate-200 p-6 task-card animate-fade-in",
      task.completed && "opacity-75"
    )}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.Id)}
          size="lg"
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className={cn(
              "text-lg font-semibold text-slate-800 leading-tight",
              task.completed && "task-completed"
            )}>
              {task.title}
            </h3>
            
            <PriorityBadge priority={task.priority} />
          </div>
          
          {task.description && (
            <div className="mb-3">
              <p className={cn(
                "text-slate-600 leading-relaxed",
                !showDescription && "line-clamp-2",
                task.completed && "task-completed"
              )}>
                {task.description}
              </p>
              {task.description.length > 100 && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1"
                >
                  {showDescription ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {task.dueDate && (
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  dueDateStatus === "overdue" && "text-error-600 font-semibold",
                  dueDateStatus === "today" && "text-accent-600 font-medium",
                  dueDateStatus === "upcoming" && "text-slate-500"
                )}>
                  <ApperIcon name="Calendar" className="w-4 h-4" />
                  {formatDueDate(task.dueDate)}
                </div>
              )}
              
              <div className="text-sm text-slate-400">
                Created {format(new Date(task.createdAt), "MMM dd")}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-2"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="p-2 text-error-500 hover:text-error-600 hover:bg-error-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard