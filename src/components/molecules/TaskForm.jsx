import { useState, useEffect } from "react"
import { format } from "date-fns"
import FormField from "@/components/molecules/FormField"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskForm = ({ 
  task = null, 
  lists = [], 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    listId: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        listId: task.listId || ""
      })
    } else {
      // Set default list for new tasks
      const defaultList = lists.find(list => list.name === "Personal") || lists[0]
      setFormData(prev => ({
        ...prev,
        listId: defaultList?.id || ""
      }))
    }
  }, [task, lists])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.listId) {
      newErrors.listId = "Please select a list"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null
    }
    
    onSubmit(taskData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField 
        label="Task Title" 
        required 
        error={errors.title}
      >
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title..."
          error={!!errors.title}
        />
      </FormField>

      <FormField 
        label="Description"
        hint="Optional details about the task"
      >
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add any additional details..."
          rows={3}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Priority" 
          required
        >
          <Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
        </FormField>

        <FormField 
          label="Due Date"
          hint="Optional deadline"
        >
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
          />
        </FormField>
      </div>

      <FormField 
        label="List" 
        required 
        error={errors.listId}
      >
        <Select
          value={formData.listId}
          onChange={(e) => handleChange("listId", e.target.value)}
          error={!!errors.listId}
        >
          <option value="">Select a list...</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </Select>
      </FormField>

      <div className="flex gap-3 pt-6 border-t border-slate-200">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
        >
          <ApperIcon name="Check" className="w-4 h-4 mr-2" />
          {task ? "Update Task" : "Create Task"}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          <ApperIcon name="X" className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TaskForm