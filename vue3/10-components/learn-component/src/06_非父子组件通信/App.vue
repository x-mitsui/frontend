<template>
  <div>
    <h2>我是爹</h2>
    <hr />
    <son></son>
    <span>provide中的属性能在自己组件用么?{{ info1 }}</span>
    <button @click="touch">改变arr</button>
  </div>
</template>

<script>
import Son from "./Son.vue";
import { computed } from "vue";
export default {
  components: {
    Son,
  },
  data() {
    return {
      arr: [1, 2, 3],
    };
  },
  // 给子孙提供,写法一
  // provide: {
  //   info1: "传家宝",
  //   info2: "大汽车",
  // },
  // 写法二,此形式会便于使用‘正确的’this
  // provide() {
  //   return {
  //     info1: "传家宝",
  //     info2: "大汽车",

  //     info3: this.arr.length,
  //   };
  // },
  // 写法三，结合动态监听
  provide() {
    return {
      info1: "传家宝",
      info2: "大汽车",
      info3: computed(() => this.arr.length),
    };
  },
  methods: {
    touch() {
      this.arr.push(this.arr.length);
    },
  },
};
</script>

<style scoped></style>
