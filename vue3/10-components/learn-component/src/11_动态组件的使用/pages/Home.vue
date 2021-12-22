<template>
  <div>Home组件，name:{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: String,
    default: "",
  },
};
</script>

<style scoped></style>
