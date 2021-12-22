<template>
  <div>
    <home></home>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";

export default {
  name: "App",

  data() {
    return {
      msg: "123",
    };
  },
  components: {
    Home,
  },
};
</script>

<style></style>
