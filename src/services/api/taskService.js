import mockTasks from "@/services/mockData/tasks.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate a unique ID for new tasks
const generateId = (existingTasks) => {
  const maxId = existingTasks.reduce((max, task) => Math.max(max, task.Id || 0), 0)
  return maxId + 1
}

// Get tasks from localStorage or use mock data
const getTasks = () => {
  const stored = localStorage.getItem("taskflow_tasks")
  return stored ? JSON.parse(stored) : [...mockTasks]
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem("taskflow_tasks", JSON.stringify(tasks))
}

export const taskService = {
  async getAll() {
    await delay(300)
    return getTasks()
  },

  async getById(id) {
    await delay(200)
    const tasks = getTasks()
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const tasks = getTasks()
    
    const newTask = {
      ...taskData,
      Id: generateId(tasks),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    const updatedTasks = [newTask, ...tasks]
    saveTasks(updatedTasks)
    
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(350)
    const tasks = getTasks()
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates
    }
    
    tasks[taskIndex] = updatedTask
    saveTasks(tasks)
    
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const tasks = getTasks()
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id))
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found")
    }
    
    saveTasks(filteredTasks)
    return true
  },

  async getByListId(listId) {
    await delay(300)
    const tasks = getTasks()
    return tasks.filter(task => task.listId === listId)
  },

  async toggleComplete(id) {
    const task = await this.getById(id)
    return this.update(id, {
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    })
  }
}