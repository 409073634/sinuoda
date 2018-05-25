export default class BaseService {
  constructor() {
    this.__init__()
  }
  __init__() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(fn => fn !== 'constructor' && typeof this[fn] === 'function')
      .forEach(fn => {
        this[fn] = this[fn].bind(this)
      })
    return this
  }
}
