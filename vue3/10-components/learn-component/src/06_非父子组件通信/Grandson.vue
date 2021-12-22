<template>
  <div>
    <h2>我是孙子</h2>
    <h3>我拥有爷爷的{{ info1 }}和{{ info2 }}和{{ info3 }}</h3>
  </div>
</template>

<script>
export default {
  inject: ["info1", "info2", "info3"],
};
</script>

<style scoped></style>
