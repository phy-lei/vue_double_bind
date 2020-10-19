class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中属性的key
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb

    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    
    // 触发get方法，在get方法中调用addSub
    this.oldValue = vm[key]
    Dep.target = null
  }

  // 当数据发生改变时更新视图
  update() {
    console.log(123);
    let newValue = this.vm[this.key]
    if(newValue === this.oldValue) return;
    this.cb(newValue)
  }
}