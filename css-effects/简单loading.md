## 简单圈圈 loading

### 原理

通过两个模块的旋转角度差形成动画

### 元素

```html
<div class="spinner"><i></i></div>
```

### 半透明圆环

```css
.spinner {
  font-size: 40px;
  width: 1em; // 支持字体变更大小
  height: 1em;
  border-radius: 50%;
  box-shadow: inset 0 0 0 .1em rgba(0, 0, 0, .3);
}
```

### 裁剪内部 i 元素为一半方块

```css
/* 0-180旋转 */
@keyframes t-clipper {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.spinner i {
  position: absolute;
  clip: rect(0, 1em, 1em, .5em); // 距离顶部和左边的距离，相当于留下了右边半个方块
  width: 1em;
  height: 1em;
  animation: t-clipper 2s ease-in-out infinite;
}
```

### i 元素 after 裁切

裁切一半，但转速不同，形成角度差

```css
.spinner i:after {
  content: '';
  position: absolute;
  clip: rect(0, 1em, 1em, .5em);
  width: 1em;
  height: 1em;
  animation: t-circle 1s ease-in-out infinite;
  border-radius: 50%;
}

@keyframes t-circle {
  0% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
```

### 参考链接

[纯CSS3实现圆形进度条动画](https://www.cnblogs.com/sakura-panda/p/6824420.html)
