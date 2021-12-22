<template>
  <div>
    <h2><span>toRef</span>方式操作reactive对象内的值</h2>
    {{ name }}-{{ age }}
    <button @click="changeAgeByValueSelf">改变响应式对象age自己</button>
    <button @click="changeAgeByInfo">通过info改变age</button>
    <hr />
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
export default {
  setup() {
    const info = reactive({ name: "张三", age: 15 });
    // toRef也会将内部变量转化为ref
    let { name } = info;
    // 参数二为key
    let age = toRef(info, "age");
    const changeAgeByValueSelf = () => {
      console.log(age.value);
      age.value++;
      name = "李四";
      console.log(age.value);
    };
    const changeAgeByInfo = () => {
      console.log(info.age);
      info.age++;
      name = "李四";
      console.log(info.age);
    };

    return { name, age, changeAgeByValueSelf, changeAgeByInfo };
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
span {
  color: green;
}
</style>
