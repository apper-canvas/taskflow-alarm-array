import { useState, useMemo } from "react"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { format, parseISO, isAfter } from "date-fns"

const TaskList = ({ 
  tasks = [], 
  filter = "all", 
  sortBy = "created",
  searchQuery = "",
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onAddTask 
}) => {
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    switch (filter) {
      case "active":
        filtered = filtered.filter(task => !task.completed)
        break
      case "completed":
        filtered = filtered.filter(task => task.completed)
        break
      default:
        // "all" - no filtering
        break
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          const aPriority = priorityOrder[a.priority] || 0
          const bPriority = priorityOrder[b.priority] || 0
          return bPriority - aPriority // High to low
        
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        
        case "created":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt) // Newest first
      }
    })

    return sorted
  }, [tasks, filter, sortBy, searchQuery])

  const getEmptyStateConfig = () => {
    if (searchQuery) {
      return {
        icon: "Search",
        title: "No tasks found",
        description: `No tasks match "${searchQuery}". Try adjusting your search terms.`,
        actionText: null
      }
    }
    
    switch (filter) {
      case "active":
        return {
          icon: "CheckCircle2",
          title: "No active tasks",
          description: "Great job! You've completed all your tasks. Ready to add more?",
          actionText: "Add New Task"
        }
      case "completed":
        return {
          icon: "Trophy",
          title: "No completed tasks yet",
          description: "Start completing tasks to see your accomplishments here.",
          actionText: null
        }
      default:
        return {
          icon: "CheckCircle",
          title: "No tasks yet",
          description: "Create your first task to get started with organizing your work.",
          actionText: "Add Your First Task"
        }
    }
  }

  if (filteredAndSortedTasks.length === 0) {
    const emptyConfig = getEmptyStateConfig()
    return (
      <Empty
        icon={emptyConfig.icon}
        title={emptyConfig.title}
        description={emptyConfig.description}
        actionText={emptyConfig.actionText}
        onAction={emptyConfig.actionText ? onAddTask : null}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Task count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {filteredAndSortedTasks.length} {filteredAndSortedTasks.length === 1 ? "task" : "tasks"}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        
        {sortBy !== "created" && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ApperIcon name="ArrowUpDown" className="w-4 h-4" />
            Sorted by {sortBy === "priority" ? "priority" : "due date"}
          </div>
        )}
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {filteredAndSortedTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList