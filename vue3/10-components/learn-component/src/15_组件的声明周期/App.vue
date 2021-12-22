<template>
  <div>
    <button @click="isShow = false">切换按钮</button>
    <template v-if="isShow == true">
      <home></home>
    </template>
  </div>
</template>

<script>
import Home from "./Home.vue";
export default {
  data() {
    return {
      isShow: true,
    };
  },
  components: {
    Home,
  },
};
</script>

<style scoped></style>
