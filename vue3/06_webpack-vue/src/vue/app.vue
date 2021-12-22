<template>
  <h2>我是vue组件</h2>
  <h2>{{ message }}</h2>
  <hello></hello>
</template>
<script>
import hello from "./hello.vue";
export default {
  data() {
    return {
      message: "组件信息",
    };
  },
  components: {
    hello,
  },
};
</script>
<style scoped>
h2 {
  color: red;
}
</style>
