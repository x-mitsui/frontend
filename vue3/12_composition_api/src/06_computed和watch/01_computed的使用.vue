<template>
  <div>
    <h2>{{ firstName }}---{{ lastName }}</h2>
    <h2>{{ fullName }}</h2>

    <button @click="changeName">changeNAme</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    let firstName = ref("James");
    let lastName = ref("Hardon");
    // 一：computed传入一个getter函数
    // 返回的值是一个ref对象
    // const fullName = computed(() => firstName.value + " " + lastName.value);
    // 二：传入一个对象，对象包含getter/setter
    const fullName = computed({
      get: () => firstName.value + " " + lastName.value,
      set(newValue) {
        let names = newValue.split(" ");
        [firstName.value, lastName.value] = names;
      },
    });
    const changeName = () => {
      // firstName.value = "333";
      fullName.value = "Lebron James";
    };
    return { firstName, lastName, fullName, changeName };
  },
};
</script>

<style lang="scss" scoped></style>
