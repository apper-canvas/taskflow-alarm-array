import { useState } from "react"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ListSelector = ({ 
  lists = [], 
  activeListId, 
  onListChange, 
  taskCounts = {},
  onCreateList 
}) => {
  const [hoveredList, setHoveredList] = useState(null)

  const allTasksCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Lists</h2>
        
        {/* All Tasks */}
        <button
          onClick={() => onListChange("all")}
          onMouseEnter={() => setHoveredList("all")}
          onMouseLeave={() => setHoveredList(null)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 mb-2",
            activeListId === "all" 
              ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500" 
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-3">
            <ApperIcon 
              name="List" 
              className={cn(
                "w-5 h-5",
                activeListId === "all" ? "text-primary-600" : "text-slate-400"
              )} 
            />
            <span className="font-medium">All Tasks</span>
          </div>
          
          <Badge variant="default" size="sm">
            {allTasksCount}
          </Badge>
        </button>
      </div>

      {/* Individual Lists */}
      <div className="space-y-2">
        {lists.map((list) => (
          <button
            key={list.id}
            onClick={() => onListChange(list.id)}
            onMouseEnter={() => setHoveredList(list.id)}
            onMouseLeave={() => setHoveredList(null)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200",
              activeListId === list.id 
                ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500" 
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                  "w-3 h-3 rounded-full",
                  activeListId === list.id ? "bg-primary-500" : "bg-slate-300"
                )}
                style={{ backgroundColor: activeListId === list.id ? undefined : list.color }}
              />
              <span className="font-medium">{list.name}</span>
            </div>
            
            <Badge variant="default" size="sm">
              {taskCounts[list.id] || 0}
            </Badge>
          </button>
        ))}
      </div>

      {/* Create New List */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <Button
          variant="ghost"
          onClick={onCreateList}
          className="w-full justify-start text-slate-600 hover:text-slate-800"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Create New List
        </Button>
      </div>
    </div>
  )
}

export default ListSelector