<template>
  <div>
    <button @click="isShow = !isShow">切换</button>

    <transition>
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
