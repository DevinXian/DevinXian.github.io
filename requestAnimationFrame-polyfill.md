## requestAnimationFrame polyfill 学习

### 基本概念

1. 解释：通知浏览器想要执行一些任务；会要求浏览器在下一次重绘之前执行用户传入的回调；
2. 一般情况下，回调执行频率和屏幕刷新频率会同步，比如 60hz，不会导致渲染和动画卡顿
3. 可用于分割比较大的任务；因为 js 在主线程执行，可能会导致其他任务延迟，进而卡顿不流畅。
4. 标准签名:

  ```typescript
  interface requestAnimationFrame {
    (callback: FrameRequestCallback): number;
  }

  interface FrameRequestCallback {
    // 参数 time 是上一次渲染完成时间（ms，相对于 timeOrigin)
    (time: DOMHighResTimeStamp): void;
  }
  ```
### polyfill 及解析

  ```javascript
  (function() {
    var lastTime = 0;
 
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
          var currTime = Date.now();
          // currTime - lastTime 表示距离上次渲染完成的间隔，也就是当前帧已经用掉的时间
          // timeToCall 表示这一帧剩下多少时间，也就是 1s/60hz -> 16.67ms - 已经用掉的时间 -> 当前帧剩余时间
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));

          // 剩余时间到，传入渲染完成时间
          var id = window.setTimeout(function() { 
            // currTime + timeToCall 表示新的最后渲染完成时间
            callback(currTime + timeToCall); 
          }, timeToCall);

          lastTime = currTime + timeToCall;
          return id;
      };
 
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
    }
  }());
  ```


### 一个更好的版本是 

1. https://github.com/chrisdickinson/raf
2. 增加了这一段逻辑：同一帧添加多个回调，则回调时间相同，均采用第一个回调添加时间，参见 MDN 表述：
>  When multiple callbacks queued by requestAnimationFrame() begin to fire in a single frame, each receives the same timestamp even though time has passed during the computation of every previous callback's workload.



### 其他参考文档
1. https://mp.weixin.qq.com/s/ocFcBRjj8xzizF5ebFepdA


