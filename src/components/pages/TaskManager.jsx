import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import ListSelector from "@/components/molecules/ListSelector"
import TaskList from "@/components/organisms/TaskList"
import TaskForm from "@/components/molecules/TaskForm"
import Modal from "@/components/molecules/Modal"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import { taskService } from "@/services/api/taskService"
import { listService } from "@/services/api/listService"

const TaskManager = () => {
  // Data state
  const [tasks, setTasks] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // UI state
  const [activeListId, setActiveListId] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setError("")
      setLoading(true)
      
      const [tasksData, listsData] = await Promise.all([
        taskService.getAll(),
        listService.getAll()
      ])
      
      setTasks(tasksData)
      setLists(listsData)
    } catch (err) {
      setError(err.message || "Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  // Task operations
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      setIsTaskModalOpen(false)
      setEditingTask(null)
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData)
      setTasks(prev => prev.map(task => 
        task.Id === editingTask.Id ? updatedTask : task
      ))
      setIsTaskModalOpen(false)
      setEditingTask(null)
      toast.success("Task updated successfully!")
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId)
    if (!task) return

    try {
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      })
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))
      
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task marked as active"
      )
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  // Modal handlers
  const openCreateModal = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const closeModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  // Filter tasks based on active list
  const filteredTasks = activeListId === "all" 
    ? tasks 
    : tasks.filter(task => task.listId === activeListId)

  // Calculate task counts per list
  const taskCounts = lists.reduce((counts, list) => {
    counts[list.id] = tasks.filter(task => 
      task.listId === list.id && !task.completed
    ).length
    return counts
  }, {})

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadData} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-slate-600 mt-2">
                Organize your work and get things done
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={openCreateModal}
              className="hidden md:flex"
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Search tasks by title or description..."
            className="max-w-md"
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 shrink-0 hidden lg:block">
            <ListSelector
              lists={lists}
              activeListId={activeListId}
              onListChange={setActiveListId}
              taskCounts={taskCounts}
              onCreateList={() => toast.info("List creation coming soon!")}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onAddTask={openCreateModal}
            />

            {/* Mobile List Selector */}
            <div className="lg:hidden mb-6">
              <ListSelector
                lists={lists}
                activeListId={activeListId}
                onListChange={setActiveListId}
                taskCounts={taskCounts}
                onCreateList={() => toast.info("List creation coming soon!")}
              />
            </div>

            {/* Task List */}
            <div className="mt-6">
              <TaskList
                tasks={filteredTasks}
                filter={activeFilter}
                sortBy={sortBy}
                searchQuery={searchQuery}
                onToggleComplete={handleToggleComplete}
                onEditTask={openEditModal}
                onDeleteTask={handleDeleteTask}
                onAddTask={openCreateModal}
              />
            </div>
          </div>
        </div>

        {/* Task Modal */}
        <Modal
          isOpen={isTaskModalOpen}
          onClose={closeModal}
          title={editingTask ? "Edit Task" : "Create New Task"}
          size="lg"
        >
          <TaskForm
            task={editingTask}
            lists={lists}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={closeModal}
          />
        </Modal>
      </div>
    </div>
  )
}

export default TaskManager