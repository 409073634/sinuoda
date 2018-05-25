const UFObject = function (obj) {
  this.obj = obj
}

UFObject.prototype.map = function (callback) {
  return Object.assign({}, ...Object.keys(this.obj).map(k => ({ [k]: callback(this.obj[k], k) })))
}

UFObject.prototype.filter = function (callback) {
  return Object.assign({}, ...Object.keys(this.obj).filter(k => callback(this.obj[k], k)).map(k => ({ [k]: this.obj[k] })))
}

UFObject.prototype.mapFilter = function (prop) {
  return Object.assign({}, ...Object.keys(this.obj).map(k => ({ [k]: { [prop]: this.obj[k][prop] } })))
}

UFObject.prototype.flatMap = function (prop) {
  return Object.assign({}, ...Object.keys(this.obj).map(k => ({ [k]: this.obj[k][prop] })))
}

UFObject.prototype.toObject = function () {
  return this.obj
}

UFObject.prototype.toArray = function () {
  return Object.keys(this.obj).map(k => ({
    key: k,
    value: this.obj[k]
  }))
}

export default UFObject
