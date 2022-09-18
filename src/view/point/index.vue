<template>
  <div class="point-page">
    <h3>
      模仿 <a
        class="underline"
        href="https://www.jetbrains.com/fleet/">Fleet</a> 的官网光标跟踪效果
    </h3>
    <div
      v-point
      class="point-container flex align-items justify-center">
      <div class="point-desc">
        鼠标放上来~
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.point {
  &-page {
    height: 600px;
  }

  &-container {
    height: 500px;
    border: 1px solid #ddd
  }
}
</style>