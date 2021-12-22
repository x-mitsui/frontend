<template>
  <div>
    <h2>我是另外的组件</h2>
    <h2>接收信息{{ info.name }}</h2>
    <hr />
    <son></son>
  </div>
</template>

<script>
import Son from "./Son.vue";
import emitter from "./eventbus.js";
export default {
  data() {
    return {
      info: {},
    };
  },
  created() {
    emitter.on("transmit1", (info) => {
      console.log("监听transmit1的结果:" + info);
      this.info = info;
    });
    emitter.on("transmit2", (info) => {
      console.log("监听transmit2的结果:" + info);
      this.info = info;
    });
    emitter.on("*", (type, info) => {
      console.log("监听所有的结果:" + type + ";", info);
    });
    /*
    // 取消所有监听
    emitter.all.clear();
    // 取消单个监听
    function onFoo(){}
    emitter.on('foo',onFoo)
    emitter.off('foo',onFoo)
    */
  },
  components: {
    Son,
  },
};
</script>

<style scoped></style>
