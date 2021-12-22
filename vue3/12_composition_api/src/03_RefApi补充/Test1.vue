<template>
  <div>
    <h2>普通方式操作reactive对象内的值</h2>
    {{ info.name }}-{{ info.age }}
    <button @click="changeAge">改变age</button>
    <hr />
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const info = reactive({ name: "张三", age: 15 });
    // 注意普通解构是值传递,所以name和age不是响应式变量，如何将它俩也变成响应式呢，看Test2和Test3组件
    // let { name, age } = info;
    const changeAge = () => {
      console.log(info.age);
      info.age++;
      console.log(info.age);
    };
    return { info, changeAge };
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
