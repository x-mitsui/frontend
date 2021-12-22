<template>
  <div>
    <h2>name:{{ name }};age:{{ age }}</h2>

    <button @click="changeName">changeName</button>
    <button @click="changeAge">changeAge</button>
  </div>
</template>

<script>
import { watch, watchEffect, ref } from "vue";
export default {
  setup() {
    let name = ref("Lebron");
    let age = ref(19);

    const changeName = () => {
      name.value = "Tom";
    };
    const stop = watchEffect(() => {
      console.log("name:", name.value, "age:", age.value);
    });
    const changeAge = () => {
      age.value++;
      if (age.value > 25) {
        stop();
      }
    };

    return {
      name,
      age,
      changeName,
      changeAge,
    };
  },
};
</script>

<style lang="scss" scoped></style>
