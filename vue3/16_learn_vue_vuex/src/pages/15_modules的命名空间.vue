<template>
  <h2>rootCounter:{{ $store.state.rootCounter }}</h2>
  <h2>homeCounter:{{ $store.state.home.homeCounter }}</h2>
  <h2>userCounter:{{ $store.state.user.userCounter }}</h2>
  <hr />
  <h2>doubleHomeCounter:{{ $store.getters["home/doubleHomeCounter"] }}</h2>
  <button @click="homeIncrement">home+1</button>
  <button @click="homeIncrementAction">action-home+1</button>
</template>

<script>
export default {
  methods: {
    homeIncrement() {
      this.$store.commit("home/increment");
    },
    homeIncrementAction() {
      this.$store.dispatch("home/incrementAction");
    },
  },
};
</script>

<style></style>
