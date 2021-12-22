<template>
  <div class="nav-bar">
    <!-- 默认插槽也有名字，为“default” -->
    <slot></slot>
    <div class="left">
      <!-- 此slot位置将会被替换掉 -->
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-bar {
  display: flex;
}
.nav-bar .left,
.nav-bar .right,
.nav-bar .center {
  flex: 1;
  background-color: #0f0;
  text-align: center;
  line-height: 44px;
  height: 44px;
}
.nav-bar .center {
  background-color: #f00;
}
</style>
