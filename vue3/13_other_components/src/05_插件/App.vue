<template>
  <div>
    <h2 v-format-time-by-plugin>1640151443</h2>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance } from "vue";
export default {
  mounted() {
    console.log("mounted:" + this.$name);
  },
  setup() {
    onMounted(() => {
      const instance = getCurrentInstance();
      const name = instance.appContext.config.globalProperties.$name;

      console.log("setup中获取name:", name);
    });
  },
};
</script>

<style scoped></style>
