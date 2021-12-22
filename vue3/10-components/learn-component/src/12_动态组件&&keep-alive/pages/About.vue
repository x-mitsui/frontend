<template>
  <div>
    About组件<button @click="count++">{{ count }}</button>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      count: 0,
    };
  },
  created() {
    // keep-alive时该组件一旦created就不会unmounted
    console.log("About created---->");
  },
  unmounted() {
    console.log("About unmounted---->");
  },
  // 处于活跃
  activated() {
    console.log("About activated---->");
  },
  // 处于不活跃
  deactivated() {
    console.log("About deactivated---->");
  },
};
</script>

<style scoped></style>
