import { win } from "@/utils/window"

export const getItemFromLocalStorage = <T>(key: string, fallback?: T): T => {
  if (!win.isBrowser()) return fallback as T

  const item = localStorage.getItem(key)
  if (item) return JSON.parse(item) as T

  return fallback as T
}

export const getItemFromSessionStorage = <T>(key: string, fallback: T): T => {
  const item = sessionStorage.getItem(key)
  if (!item) return fallback

  return JSON.parse(item) as T
}

export const getCookie = <T>(key: string): T | null => {
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")
  const cookie = ca.filter((c) => c.trim().startsWith(`${key}=`))
  if (cookie.length === 0) return null

  return JSON.parse(cookie[0].trim().substring(`${key}=`.length)) as T
}

export const setItemInLocalStorage = <T>(key: string, value: T) => {
  if (!win.isBrowser()) return
  localStorage.setItem(key, JSON.stringify(value))
}

export const setItemInSessionStorage = <T>(key: string, value: T) => {
  if (!win.isBrowser()) return
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const removeItemInLocalStorage = (key: string) => {
  if (!win.isBrowser()) return
  localStorage.removeItem(key)
}
