// Utility functions for user-specific localStorage management

export const getUserStorageKey = (userId: string, key: string): string => {
  return `user_${userId}_${key}`
}

export const getCurrentUserId = (): string => {
  return localStorage.getItem('currentUserId') || 'anonymous'
}

export const setUserData = (key: string, data: any): void => {
  const userId = getCurrentUserId()
  const storageKey = getUserStorageKey(userId, key)
  localStorage.setItem(storageKey, JSON.stringify(data))
}

export const getUserData = (key: string): any => {
  const userId = getCurrentUserId()
  const storageKey = getUserStorageKey(userId, key)
  const data = localStorage.getItem(storageKey)
  return data ? JSON.parse(data) : null
}

export const removeUserData = (key: string): void => {
  const userId = getCurrentUserId()
  const storageKey = getUserStorageKey(userId, key)
  localStorage.removeItem(storageKey)
}

export const clearAllUserData = (userId: string): void => {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(`user_${userId}_`)) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}

export const getAllUserSessions = (): any[] => {
  const userId = getCurrentUserId()
  const sessionKeys = Object.keys(localStorage).filter(key => 
    key.startsWith(`user_${userId}_session_`)
  )
  
  return sessionKeys.map(key => {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}')
    } catch {
      return null
    }
  }).filter(Boolean)
} 