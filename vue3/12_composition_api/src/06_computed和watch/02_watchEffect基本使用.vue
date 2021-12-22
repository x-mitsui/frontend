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
    const changeAge = () => {
      age.value++;
    };
    // 开始时默认立即执行一次，自动收集可响应式对应的依赖（但是怎么收集的呢）
    // 只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行
    watchEffect(() => {
      console.log("name:", name.value);
    });
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
