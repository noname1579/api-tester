import type { ApiRequest } from "./types/types"

export const loadHistoryFromStorage = (): ApiRequest[] => {
  try {
    const data = localStorage.getItem('apiTesterHistory')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveHistoryToStorage = (history: ApiRequest[]) => {
  try {
    localStorage.setItem('apiTesterHistory', JSON.stringify(history))
  } catch (error) {
    console.error('Failed to save history to localStorage', error)
  }
}