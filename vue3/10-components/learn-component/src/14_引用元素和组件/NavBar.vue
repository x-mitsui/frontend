<template>
  <div>
    <button @click="getParentAndroot">获取父和根</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "holo wod",
    };
  },
  methods: {
    test() {
      console.log("test~~");
    },
    getParentAndroot() {
      // 不建议使用，因为这样用耦合性强
      // vue3移除了$children
      console.log(this.$root);
      console.log(this.$parent);
    },
  },
};
</script>

<style scoped></style>
