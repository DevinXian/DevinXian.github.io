### 场景：swiper 元素高度不同

1. 已知 swiper 元素高度列表，swiper 动画过程中调整 swiper 高度
2. 核心思路：

  - 判断当前 swiper 元素是哪个，获取索引和位置 dx，取得当前活动 swiper-item 高度 H 及其跟上个 swiper-item 的高度差值 D
  - 设需要渲染的相邻 swiper-item 高度差为 X，则动画过程中存在等比关系（类比图片等比例放大），即: X/D = dx / swiperWidth，需要注意 dx 边界情况，如：超过 swiper 宽度等。
  - 设置 swiper style 高度