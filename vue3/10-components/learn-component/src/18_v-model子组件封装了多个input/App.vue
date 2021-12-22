<template>
  <div>
    <super-input v-model="message" v-model:title="title"></super-input>
    <div>App:{{ message }}</div>
    <div>App:{{ title }}</div>
  </div>
</template>

<script>
import SuperInput from "./SuperInput.vue";
export default {
  data() {
    return {
      message: "App's info",
      title: "lih's mama",
    };
  },
  components: {
    SuperInput,
  },
};
</script>

<style scoped></style>
