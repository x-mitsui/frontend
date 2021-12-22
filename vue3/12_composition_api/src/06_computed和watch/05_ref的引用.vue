<template>
  <div>
    <h2 ref="title">222</h2>

    <button @click="changeName">changeName</button>
  </div>
</template>

<script>
import { watch, watchEffect, ref } from "vue";
export default {
  setup() {
    // 这块对于元素的说明不是太懂，后面需要复盘
    // 第一次值为null，第二次会将元素赋值给title.value
    const title = ref(null);
    watchEffect(
      () => {
        console.log(title.value);
      },
      { flush: "post" }
    ); //延后第一次执行，挂载之后执行
    return {
      title,
    };
  },
  mounted() {
    console.log(this.$refs.title);
  },
};
</script>

<style lang="scss" scoped></style>
