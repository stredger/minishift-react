
import { compress, decompress } from 'lz-string'

const cache = {

  store: window.sessionStorage,

  put(key, data) {
    const json = JSON.stringify(data)
    this.store.setItem(key, compress(json))
  },

  evict(key) {
    this.store.removeItem(key)
  },

  invalidate(partialKey) {
    Object.keys(this.store).forEach((key) => {
      if (key.startsWith(partialKey)) {
        this.evict(key)
      }
    })
  },

  get(key) {
    const data = this.store.getItem(key)
    if (!data) {
      return null
    }
    return JSON.parse(decompress(data))
  },
}

export default cache
