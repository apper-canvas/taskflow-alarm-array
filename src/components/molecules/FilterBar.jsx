import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  onAddTask 
}) => {
  const filters = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ]

  const sortOptions = [
    { value: "created", label: "Date Created" },
    { value: "priority", label: "Priority" },
    { value: "dueDate", label: "Due Date" }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Filter Buttons */}
          <div className="flex gap-1">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Sort by:</span>
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-40"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Add Task Button */}
        <Button
          variant="primary"
          onClick={onAddTask}
          className="shrink-0"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  )
}

export default FilterBar