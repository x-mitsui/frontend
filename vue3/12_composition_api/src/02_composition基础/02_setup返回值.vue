<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <h2>{{ counter }}</h2>
    <button @click="increment">加1</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
  setup() {
    // 普通变量不能相应
    let counter = 100;
    const increment = () => {
      counter++;
      console.log(counter);
    };
    // 有了下面就没必要使用data了，而且它优先级也高于data
    return {
      title: "Haleo Mali",
      counter,
      increment,
    };
  },
};
</script>

<style scoped></style>
