<template>
  <div>
    Home组件
    <button @click="count++">{{ count }}</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      count: 0,
    };
  },
  created() {
    // keep-alive时该组件一旦created就不会unmounted
    console.log("Home created---->");
  },
  unmounted() {
    console.log("Home unmounted---->");
  },
  // 处于活跃
  activated() {
    console.log("Home activated---->");
  },
  // 处于不活跃
  deactivated() {
    console.log("Home deactivated---->");
  },
};
</script>

<style scoped></style>
