### http request pause

1. http 协议没有暂停机制，所以实现只是一种 js 处理层面的伪暂停，本质上是一种异步处理手段
2. 简单实现：

```javascript
class PauseController {
  constructor() {
    this.isPaused = false;
    this.shouldResume = false;
    this.promise = new Promise(r => {
      this.resolve = r;
    })
  }
  pause = () => {
    if (!this.isPaused) {
      this.isPaused = true;
    }
  }
  resume = () => {
    if (this.isPaused) {
      this.isPaused = false;
      this.resolve();
    }
  }
}

const createPausableRequest = (request) => {
  const pc = new PauseController();

  const controlledRequest = request().then(data => {
    // 判断是否暂停
    if (!pc.isPaused) {
      pc.resolve();
    }
    return data;
  })

  const result = Promise
    .all([controlledRequest, pc.promise])
    .then(data => data[0])

  // result.finally(() => pc.resolve())
  result.pause = pc.pause;
  result.resume = pc.resume;

  return result;
}

// 使用方式
const demo = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('demo'), 1000);
  })
}

const result = createPausableRequest(demo);

result.then((data) => {
  console.log('result ->', data) // should be: result -> demo
})

result.pause();

setTimeout(() => result.resume(), 3000)
```

3. 原理：Promise 实例状态的异步驱动，将 `resolve` 交由外部来处理；类似封装场景比如：

  - 在小程序中新页面拉起刷脸认证功能，可以封装为 Promise 调用，将 `resolve` 交给页面之间的变量，刷脸完成后调用 `resolve` 即可驱动 Promise 状态变更
