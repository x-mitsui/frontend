<template>
  <div>
    Category组件

    <button @click="push">推送</button>
  </div>
</template>

<script>
export default {
  emits: ["transmit"],
  methods: {
    push() {
      this.$emit("transmit", "good");
    },
  },
};
</script>

<style scoped></style>
