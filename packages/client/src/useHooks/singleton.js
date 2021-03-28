const Singleton = (function () {
  let instance
  Singleton = function Singleton() {
    if (instance) {
      return instance
    }

    instance = this

    this.start_time = 0
    this.others = 'others'
  }
})()

function Singleton2() {
  if (typeof Singleton2.instance === 'object') {
    return Singleton2.instance
  }

  this.start_time = 0
  this.others = 'others'

  Singleton2.instance = this
}

function Singleton3() {
  let o

  Singleton3 = function Singleton3() {
    return o
  }

  // for dynamic prototype mode
  Singleton3.prototype = this

  // o.__proto__=Singleton
  o = new Singleton3()
  //
  o.constructor = Singleton3
  this.start_time = 0
  this.others = 'others'

  return o // not return this!
}
