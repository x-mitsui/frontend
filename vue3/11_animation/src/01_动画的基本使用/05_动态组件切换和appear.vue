<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <div class="test1">
      <!-- 结合动态组件使用 -->
      <!-- appear为true，开始就播放动画 ,:appear动态绑定""内的变量，appear是直取字符串-->
      <transition name="xx" mode="out-in" :appear="true">
        <component :is="isShow ? 'about' : 'home'"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";
export default {
  name: "App",
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    About,
    Home,
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
