<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <div class="test1">
      <transition name="xx" mode="out-in">
        <h2 class="box" v-if="isShow">Helloworld</h2>
        <h2 class="box" v-else>What's up</h2>
      </transition>
    </div>

    <hr />
    <div class="test2">
      <transition name="xx" mode="in-out">
        <h2 class="box" v-if="isShow">Helloworld</h2>
        <h2 class="box" v-else>What's up</h2>
      </transition>
    </div>

    <hr />
    <div class="test3">
      <transition name="xx">
        <h2 class="box" v-if="isShow">Helloworld</h2>
        <h2 class="box" v-else>What's up</h2>
      </transition>
    </div>
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
.test1,
.test2,
.test3 {
  height: 130px;
}
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
