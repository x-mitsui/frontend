<template>
  <h2>我是子组件</h2>
</template>
<script>
export default {
  data() {
    return {
      message: "子组件信息",
    };
  },
};
</script>
<style scoped>
h2 {
  color: blue;
}
</style>
