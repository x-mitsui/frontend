<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <!-- 在template模板中使用ref对象，会自动解引用，但只能浅层解引用，嵌套过深，需要.value -->
    <h2>{{ counter }}</h2>
    <h2>{{ info.counter.value }}</h2>
    <hr />
    <!-- 这样也可以解引用，但不建议这样用 -->
    <h2>{{ reactiveInfo.counter }}</h2>
    <button @click="increment">加1</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  props: {
    message: {
      type: String,
    },
  },
  setup() {
    // counter变成了一个可响应式引用
    let counter = ref(100);

    let info = { counter: ref(100) };

    let reactiveInfo = reactive({ counter });

    const increment = () => {
      counter.value++;
      console.log(counter.value);
    };
    // 有了下面就没必要使用data了，而且它优先级也高于data
    return {
      title: "Haleo Mali",
      counter,
      increment,
      info,
      reactiveInfo,
    };
  },
};
</script>

<style scoped></style>
