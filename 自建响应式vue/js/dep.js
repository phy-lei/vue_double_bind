class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }

  // 添加观察者
  addSub(sub) {
    if(sub && sub.update){
      this.subs.push(sub)
    }
  }

  // 发送通知 执行watcher中的update更新视图
  notify() {
    console.log(123);
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}