<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <!-- 优先级高于普通类名
  enter-from-class
  enter-active-class
  enter-to-class
  leave-from-class
  leave-active-class
  leave-to-class
 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDownBig"
      leave-active-class="animate__animated animate__lightSpeedOutLeft"
    >
      <h2 v-if="isShow">你好吗</h2>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShow: false,
    };
  },
  components: {},
};
</script>

<style scoped>
.box {
  width: 100px;
}

.v-enter-active {
  animation: bounceInUp 1s;
}
.v-leave-active {
  animation: bounceOutUp 1s;
}
</style>
