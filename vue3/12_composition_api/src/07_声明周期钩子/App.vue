<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increment">加1</button>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated, onUnmounted } from "vue";
export default {
  // 注意写法小差别
  mounted() {},
  // 组件”创建完“（注意这个创建并不等于created和beforeCreate）才执行setup()
  setup() {
    // composition API写法没有created beforeCreate函数，有需要直接写在setup()里
    const counter = ref(0);
    // 为什么这样写就可以？
    onMounted(() => {
      console.log("App onMounted1---->");
    });
    onMounted(() => {
      console.log("App onMounted2---->");
    });
    onUpdated(() => {
      console.log("App onUpdateed---->");
    });
    onUnmounted(() => {
      console.log("App onUnmounted---->");
    });
    const increment = () => {
      counter.value++;
    };
    return {
      counter,
      increment,
    };
  },
};
</script>

<style lang="scss" scoped></style>
