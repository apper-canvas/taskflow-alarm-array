import mockLists from "@/services/mockData/lists.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate a unique ID for new lists
const generateId = (existingLists) => {
  const maxId = existingLists.reduce((max, list) => Math.max(max, list.Id || 0), 0)
  return maxId + 1
}

// Get lists from localStorage or use mock data
const getLists = () => {
  const stored = localStorage.getItem("taskflow_lists")
  return stored ? JSON.parse(stored) : [...mockLists]
}

// Save lists to localStorage
const saveLists = (lists) => {
  localStorage.setItem("taskflow_lists", JSON.stringify(lists))
}

export const listService = {
  async getAll() {
    await delay(250)
    return getLists()
  },

  async getById(id) {
    await delay(200)
    const lists = getLists()
    const list = lists.find(l => l.id === id)
    if (!list) {
      throw new Error("List not found")
    }
    return { ...list }
  },

  async create(listData) {
    await delay(300)
    const lists = getLists()
    
    const newList = {
      ...listData,
      id: `list_${Date.now()}`,
      taskCount: 0,
      createdAt: new Date().toISOString()
    }
    
    const updatedLists = [...lists, newList]
    saveLists(updatedLists)
    
    return { ...newList }
  },

  async update(id, updates) {
    await delay(250)
    const lists = getLists()
    const listIndex = lists.findIndex(l => l.id === id)
    
    if (listIndex === -1) {
      throw new Error("List not found")
    }
    
    const updatedList = {
      ...lists[listIndex],
      ...updates
    }
    
    lists[listIndex] = updatedList
    saveLists(lists)
    
    return { ...updatedList }
  },

  async delete(id) {
    await delay(200)
    const lists = getLists()
    const filteredLists = lists.filter(l => l.id !== id)
    
    if (filteredLists.length === lists.length) {
      throw new Error("List not found")
    }
    
    saveLists(filteredLists)
    return true
  }
}