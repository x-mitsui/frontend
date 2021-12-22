<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <!-- type:明确告知vue以谁为准来结束 -->
    <transition name="xx" type="transition" :duration="{ enter: 100, leave: 800 }">
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
.xx-enter-from,
.xx-leave-to {
  opacity: 0;
}
/* 可以省略，因为插入的时候元素本来就是opacity为1 */
/* .xx-leave-from,
.xx-enter-to {
  opacity: 1;
} */
.xx-enter-active {
  animation: ani-idd 1s ease;
  transition: opacity 2s ease;
}
.xx-leave-active {
  animation: ani-idd 1s ease reverse;
  transition: opacity 2s ease;
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
