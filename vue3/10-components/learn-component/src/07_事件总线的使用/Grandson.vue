<template>
  <div>
    <h2>我是孙子</h2>
    <button @click="transmit">发送事件</button>
  </div>
</template>

<script>
import emitter from "./eventbus.js";
export default {
  created() {},
  methods: {
    transmit() {
      emitter.emit("transmit1", { name: "张三", age: 18 });
      emitter.emit("transmit2", { name: "李四", age: 20 });
    },
  },
};
</script>

<style scoped></style>
