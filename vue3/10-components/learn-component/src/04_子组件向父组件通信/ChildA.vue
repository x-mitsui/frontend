<template>
  <div>
    <button @click="touchEvent">触发父级信息</button>
  </div>
</template>

<script>
export default {
  // 对通信事件注册
  emits: ["transmit"],
  // 对参数进行验证
  // emits: {
  //   func1: null,
  //   func2: (para_A, para_B) => {
  //     return para_A == 0 || para_B == 0;
  //   },
  // },
  methods: {
    touchEvent() {
      this.$emit("transmit", 3);
    },
  },
};
</script>

<style scoped></style>
