<template>
  <div>
    <h2>{{ info.name }}</h2>

    <button @click="changeData">changeData</button>
  </div>
</template>

<script>
import { watch, ref, reactive } from "vue";
export default {
  setup() {
    const info = reactive({ name: "lili", age: 33 });
    // 情况一：第一个参数是可响应式对象
    // 获取到的newValue, oldValue都是reactive对象
    // watch(info, (newValue, oldValue) => {
    //   console.log("newValue:", newValue, "oldValue:", oldValue);
    // });
    // 如果想获取reactive对象原值，参数一写为getter
    // 观察代理被解构就会由Proxy对象变成一个普通对象
    console.log("打印info:", { ...info });
    watch(
      () => ({ ...info }),
      (newValue, oldValue) => {
        console.log("newValue:", newValue, "oldValue:", oldValue);
      }
    );
    // 情况二：第一个参数是一个ref对象,newValue,oldValue就是原值了
    // const name = ref("kaka");
    // watch(name, (newValue, oldValue) => {
    //   console.log("newValue:", newValue, "oldValue:", oldValue);
    // });

    const changeData = () => {
      // 对应情况一：测试就打开这句
      info.name = "lucy";
      // 对应情况二：测试就打开这句
      // name.value = "lucy";
    };
    return {
      info,
      changeData,
    };
  },
  mounted() {
    console.log(this.$refs.title);
  },
};
</script>

<style lang="scss" scoped></style>
