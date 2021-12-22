<template>
  <div class="hello">
    <hr />
    <h2>{{ title }}</h2>
    <h3>{{ content }}</h3>
    <h3>{{ age }}</h3>
  </div>
</template>

<script>
export default {
  // type取值：Number String Boolean
  // Array Object Date Function
  // Symbol
  props: {
    title: String,
    content: {
      type: String,
      default: "are you ok?",
    },
    age: {
      type: Number,
      require: true,
    },
    school: {
      type: Object,
      default() {
        return { name: "333" };
      },
    },
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
