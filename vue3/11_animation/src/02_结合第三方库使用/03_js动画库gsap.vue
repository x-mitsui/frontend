<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <!-- :css="false" vue会跳过css的检测-->

    <!-- transition组件提供的钩子  -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      :css="false"
    >
      <h2 v-if="isShow">你好吗</h2>
    </transition>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "App",
  data() {
    return {
      isShow: false,
      distance: 200,
    };
  },
  methods: {
    beforeEnter() {},
    enter(el, done) {
      gsap.from(el, {
        scale: 0,
        y: this.distance,
        duration: 1,
        onComplete: done,
      });
    },
    afterEnter() {},
    enterCancelled() {},
    //
    beforeLeave() {},
    leave(el, done) {
      gsap.to(el, {
        scale: 0,
        y: this.distance,
        duration: 1,
        onComplete: done,
      });
    },
    afterLeave() {},
    leaveCancelled() {},
  },
  components: {},
};
</script>

<style scoped>
.box {
  width: 100px;
}
h2 {
  background-color: red;
  text-align: center;
}
</style>
