<template>
  <div>
    <h2>toRefs方式操作reactive对象内的值</h2>
    {{ name }}-{{ age }}
    <button @click="changeAgeByValueSelf">改变响应式对象age自己</button>
    <button @click="changeAgeByInfo">通过info改变age</button>
    <hr />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const info = reactive({ name: "张三", age: 15 });

    // toRefs会将响应式对象内部变量转化为ref对象，
    let { name, age } = toRefs(info);
    const changeAgeByValueSelf = () => {
      console.log(age.value);
      age.value++;
      console.log(age.value);
    };
    const changeAgeByInfo = () => {
      console.log(info.age);
      info.age++;
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
</style>
