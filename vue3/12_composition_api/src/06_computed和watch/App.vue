<template>
  <div>
    <h2>{{ info.friend.name }}</h2>

    <button @click="changeData">changeData</button>
  </div>
</template>

<script>
import { watch, ref, reactive } from "vue";
export default {
  setup() {
    const info = reactive({
      name: "lili",
      age: 33,
      friend: {
        name: "Harry",
      },
    });
    // 默认深度侦听
    // watch(
    //   info,
    //   (newValue, oldValue) => {
    //     console.log("newValue:", newValue, "oldValue:", oldValue);
    //   },
    //   {}
    // );

    console.log("打印info:", { ...info });
    watch(
      () => ({ ...info }),
      (newValue, oldValue) => {
        console.log("newValue:", newValue, "oldValue:", oldValue);
      },
      {
        // 深度监听
        deep: true,
        // 第一次就立即执行
        immediate: true,
      }
    );

    const changeData = () => {
      info.friend.name = "WUGG";
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
