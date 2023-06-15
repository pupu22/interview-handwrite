const PENDING = Symbol()
const FULLFILLED = Symbol()
const REJECTED = Symbol()

const MyPromise = function(fn) {
  this.state = PENDING
  this.value = ''

  const resolve = (value) => {
    this.state = FULLFILLED;
    this.value = value;
  }

  const reject = (error) => {
    this.state = REJECTED;
    this.value = error;
  }

  this.then = (onFullfilled, onRejected) => {
    if(this.state === FULLFILLED){
      onFullfilled(this.value)
    } else {
      onRejected(this.value)
    }
  }

  // 执行传入的函数
  try {
    fn(resolve, reject)
  } catch (error){
    reject(error)
  }
}

let 