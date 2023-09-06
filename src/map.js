Array.prototype，_map_ = (fn, args){
  let length = this.length
  let res = []
  for(let i = 0; i < length; i++){
    res[i] = fn.call(args, this[i], i, res)
  }
  return res
}
