export const win = {
  search: () => (typeof window !== "undefined" ? window.location.search : ""),
  isBrowser: () => typeof window !== "undefined",
  innerWidth: () => (typeof window !== "undefined" ? window.innerWidth : 0),
  origin: () => (typeof window !== "undefined" ? window.location.origin : "")
}
