enum CacheType {
  Local,
  Session
}
class Caches {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
export const LocalCache = new Caches(CacheType.Local)
export const SessionCache = new Caches(CacheType.Session)
