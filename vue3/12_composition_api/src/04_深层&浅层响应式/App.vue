<template>
  <div>
    <h2>{{ Xref.name }}</h2>
    <h2>{{ Yref.name }}</h2>
    <button @click="changeX">按钮X</button>
    <button @click="changeY">按钮Y</button>
  </div>
</template>

<script>
import { ref, shallowRef, reactive, shallowReactive, triggerRef } from "vue";
export default {
  setup() {
    // 默认情况下ref和reactive都是深层响应式
    const Xref = ref({ name: "Jack" });
    const changeX = () => {
      Xref.value.name = "Tom";
    };

    // 浅层响应式
    const info = { name: "Jack" };
    const Yref = shallowRef(info);
    const changeY = () => {
      Yref.value.name = "Tom";
      // 可以通过triggerRef强制刷新页面
      // triggerRef(info);
    };
    return {
      Xref,
      Yref,
      changeX,
      changeY,
    };
  },
};
</script>

<style lang="scss" scoped></style>
