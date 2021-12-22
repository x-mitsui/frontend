<template>
  <div>
    <!-- 将teleport内部元素放到#app之外的元素上 -->
    <teleport to="#tel-god">
      <h2>测试teleport</h2>
      <h2>测试teleport</h2>
      <h2>测试teleport</h2>
      <hello-world />
    </teleport>
    <teleport to="#tel-god">
      <h2>测试teleport</h2>
      <hello-world />
    </teleport>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style scoped></style>
