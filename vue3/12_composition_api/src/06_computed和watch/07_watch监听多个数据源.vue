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
    const name = ref("kaka");
    // watch([info, name], (newValue, oldValue) => {
    //   console.log("newValue:", newValue, "oldValue:", oldValue);
    // });

    watch([() => ({ ...info }), name], (newValue, oldValue) => {
      console.log("newValue:", newValue, "oldValue:", oldValue);
    });

    const changeData = () => {
      info.name = "lucy";
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
