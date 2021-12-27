<template>
  <div>
    <h2>user:{{ $route.params.username }}</h2>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  mounted() {
    console.log(this.$route.params.username);
  },
  setup() {
    const route = useRoute();
    console.log(route.params);
  },
};
</script>

<style scoped></style>
