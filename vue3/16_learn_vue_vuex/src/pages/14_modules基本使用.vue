<template>
  <h2>{{ $store.state.rootCounter }}</h2>
  <h2>{{ $store.state.home.homeCounter }}</h2>
  <h2>{{ $store.state.user.userCounter }}</h2>
</template>

<script>
// import { onMounted } from "../store/modules";
// import { useStore } from "vuex";
export default {
  computed: {
    sCounter() {
      return this.$store.state.counter;
    },
  },
  setup() {},
};
</script>

<style></style>
