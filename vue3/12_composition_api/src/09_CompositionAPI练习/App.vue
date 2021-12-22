<template>
  <div id="my-app">
    <h2>counter:{{ Counter }}</h2>
    <h2>doubleCounter:{{ DoubleCounter }}</h2>
    <button @click="increment">加1</button>
    <button @click="decrement">减1</button>

    <hr />
    <h2>缓存：{{ data }}</h2>
    <button @click="changeData">改变缓存数据</button>
    <hr />
    <div class="pos">
      <h3>positionX:{{ scrollX }}</h3>
      <h3>positionY:{{ scrollY }}</h3>
      <h3>mouseX:{{ mouseX }}</h3>
      <h3>mouseY:{{ mouseY }}</h3>
    </div>
  </div>
</template>

<script>
import {
  useCounter,
  useTitle,
  useScrollPosition,
  useMousePosition,
  useLocalStorage,
} from "./hooks";
export default {
  setup() {
    // counter
    let { Counter, DoubleCounter, increment, decrement } = useCounter();
    // title
    let titleRef = useTitle();
    titleRef.value = "你好，世界";
    setTimeout(() => {
      titleRef.value = "Hello World";
    }, 3000);
    // 滚动位置
    const { scrollX, scrollY } = useScrollPosition();
    const { mouseX, mouseY } = useMousePosition();
    // localStorage
    const data = useLocalStorage("info", { name: "nana", age: 18 });
    let changeData = () => {
      data.value.name = "━((*′д｀)爻(′д｀*))━!!!!";
    };
    return {
      Counter,
      DoubleCounter,
      increment,
      decrement,
      scrollX,
      scrollY,
      mouseX,
      mouseY,
      data,
      changeData,
    };
  },
};
</script>

<style scoped>
#my-app {
  width: 3000px;
  height: 3000px;
}
.pos {
  position: fixed;
  right: 150px;
  bottom: 50px;
}
</style>
