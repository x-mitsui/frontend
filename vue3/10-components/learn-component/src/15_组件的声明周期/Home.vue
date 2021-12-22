<template>
  <div ref="home">
    {{ message }}

    <button @click="message = '你好啊'">改变</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "什么",
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    console.log(this.$refs.home.innerHTML);
  },
  updated() {
    console.log("updated");
    console.log(this.$refs.home.innerHTML);
  },
};
</script>

<style scoped></style>
