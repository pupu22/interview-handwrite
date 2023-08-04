[面试官：“你能手写一个 Promise 吗” ] https://zhuanlan.zhihu.com/p/183801144
                                          
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(exectuor){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    let resolve = (value) => {
      if(this.status === PENDING){
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }
    let reject = (reason) => {
      if(this.status === PENDING){
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }

    try{
      exectuor(resolve, reject)
    }catch(error){
      reject(error)
    }
  }

  then(onFulfilled, onRejected){
    if(this.status === FULFILLED){
      onFulfilled(this.value)
    }
    if(this.status === REJECTED){
      onRejected(this.reason)
    }
    if(this.status === PENDING){
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.value)
      })
    }
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)
