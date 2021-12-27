<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increment">+1</button>
    <hr />
    <h2 ref="titleRef">{{ message }}</h2>
    <button @click="add">增加内容</button>
  </div>
</template>

<script>
import { ref, onUpdated } from "vue";
export default {
  name: "App",
  setup() {
    /**
     * 需求：在点击完【增加内容】按钮后，计算h2高度
     */
    let message = ref("");
    const titleRef = ref(null);
    const counter = ref(0);
    const add = function () {
      message.value += "但是但是多";
      // 这个拿到的高度是h2未改变之前的高度
      console.log(titleRef.value.offsetHeight);
    };
    const increment = function () {
      counter.value++;
    };
    onUpdated(() => {
      // 虽然能获取高度，但任何其它逻辑也会触发它
      console.log(titleRef.value.offsetHeight);
    });
    return {
      message,
      titleRef,
      add,
      counter,
      increment,
    };
  },
};
</script>

<style>
h2 {
  width: 100px;
  background-color: #f00;
}
</style>
