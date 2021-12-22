<template>
  <div>
    <h2>name:{{ name }};age:{{ age }}</h2>

    <button @click="changeName">changeName</button>
    <button @click="changeAge">changeAge</button>
  </div>
</template>

<script>
import { watch, watchEffect, ref } from "vue";
export default {
  setup() {
    let name = ref("Lebron");
    let age = ref(19);

    const changeName = () => {
      name.value = "Tom";
    };
    const stop = watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        console.log("网络请求成功~");
      }, 2000);
      onInvalidate(() => {
        // 当副作用即将重新执行，或者组件和监听器停止时执行
        // 可以在这个函数中做一些结束清理工作
        // 此例每当点击按钮时，都会重新计时timer
        clearTimeout(timer);
        console.log("onInvalidate---->");
      });
      console.log("name:", name.value, "age:", age.value);
    });
    const changeAge = () => {
      age.value++;
      if (age.value > 25) {
        stop();
      }
    };

    return {
      name,
      age,
      changeName,
      changeAge,
    };
  },
};
</script>

<style lang="scss" scoped></style>
