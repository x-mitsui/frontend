<template>
  <div>
    <super-input v-model="message"></super-input>
    {{ message }}
  </div>
</template>

<script>
import SuperInput from "./SuperInput.vue";
export default {
  data() {
    return {
      message: "App's info",
    };
  },
  components: {
    SuperInput,
  },
};
</script>

<style scoped></style>
