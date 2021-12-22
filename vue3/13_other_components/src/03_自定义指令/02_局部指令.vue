<template>
  <div>
    <input type="text" />
    <input type="text" v-focus />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      mounted(el, bindings, vnode, preNode) {
        console.log("focus mounted");
        el.focus();
      },
    },
  },
  setup() {},
};
</script>

<style scoped></style>
