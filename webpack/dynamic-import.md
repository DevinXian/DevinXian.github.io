## webpack 如何实现 import()

### 先抛结论

script 标签结合 jsonp 完成模块异步加载

### 逐步来分析

1. chunk 内容，一般都是如下形式:

  ```javascript
  const self = typeof self !== 'undefined' ? self : this;

  (self['webpackJsonp_tmax'] = self['webpackJsonp_tmax'] || []).push([
    ['chunkId'],
    {
      './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval("..."); // 组件
      }
    }
  ]);

  // 其中 eval 部分包含如下核心执行逻辑：
  __webpack_require__.e("src_tmax_js")
    .then(__webpack_require__.bind(__webpack_require__, "./src/tmax.js"))
    .then((result) => {
      console.log("dynamic loading:", result);
    });
  ```

2. 先看看什么是 `__webpack_require__.e`,


```javascript
var inProgress = {};
const loadScript = (url, done) => {
  // 如果在加载中，则 done 加入等待队列
  if (inProgress[url]) {
    inProgress[url].push(done);
    return;
  }

  // script 标签加载脚本
  const script = document.createElement("script");
  script.charset = "utf-8";
  script.src = url;

  // 创建回调队列
  inProgress[url] = [done];
  var onScriptComplete = (prev, event) => {
    // 取出等待队列
    var doneFns = inProgress[url];
    // 从加载脚本中删除
    delete inProgress[url];
    script.parentNode && script.parentNode.removeChild(script);
    // 执行回调
    doneFns && doneFns.forEach((fn) => fn(event));
    // 执行原 script.onload
    if (prev) return prev(event);
  };

  // 原 script.onload 作为参数传递给 onScriptComplete
  script.onload = onScriptComplete.bind(null, script.onload);
  document.head.appendChild(script);
};
```
