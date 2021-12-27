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
import { ref, nextTick } from "vue";
export default {
  name: "App",
  setup() {
    /**
     * 需求：在点击完【增加内容】按钮后，计算h2高度(nexttick方式)
     */
    let message = ref("");
    const titleRef = ref(null);
    const counter = ref(0);
    const add = function () {
      message.value += "但是但是多";
      // 将回调推迟到下一个Dom更新周期之后执行
      nextTick(() => {
        console.log(titleRef.value.offsetHeight);
      });
    };
    const increment = function () {
      counter.value++;
    };

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
