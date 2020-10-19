// 将data中的所有key都传化成getter setter
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 1.判断data是否是对象
    if(!data || typeof data !== 'object') return;
    // 2.遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    let that = this
    // 负责收集依赖，并发送通知
    let dep = new Dep()
    //递归下对象的val也要拥有getter setter
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        //注意这里不可以用obj[key] 会发生死循环 因为obj[key]会一直触发get
        return val
      },
      set(newValue) {
        if(newValue === val) return;
        val = newValue
        // 如果有新的赋值是对象 再递归
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}