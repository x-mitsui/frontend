<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <transition name="xx">
      <h2 v-show="isShow" class="box">Helloworld</h2>
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
};
</script>

<style scoped>
.box {
  width: 100px;
}
.xx-enter-active {
  animation: ani-idd 1s ease;
}
.xx-leave-active {
  animation: ani-idd 1s ease reverse;
}
@keyframes ani-idd {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
