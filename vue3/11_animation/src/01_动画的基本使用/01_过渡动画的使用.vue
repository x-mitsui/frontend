<template>
  <div>
    <button @click="isShow = !isShow">切换</button>
    <transition name="xx">
      <h2 v-show="isShow">Helloworld</h2>
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
/*
注意【插入】

v-enter：定义进入过渡的开始状态。在元素被[插入]之前生效，在元素被[插入]之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
*/
/* -enter三阶段 from active to */
/* -leave三阶段 from active to */
/* class的前缀以transition组件的name为准，如果组件没name，就以v-开头 */
.xx-enter-from,
.xx-leave-to {
  opacity: 0;
}
.xx-enter-to,
.xx-leave-from {
  opacity: 1;
}

.xx-enter-active,
.xx-leave-active {
  transition: opacity 1s ease-in;
}
</style>
