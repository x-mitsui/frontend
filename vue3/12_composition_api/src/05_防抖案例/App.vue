<template>
  <div>
    <h2>{{ message }}</h2>
    <input type="text" name="" id="" v-model="message" />
  </div>
</template>

<script>
// import { ref } from "vue";
import debounceRef from "./hook/debounceRef";
export default {
  setup() {
    const message = debounceRef("q");
    return {
      message,
    };
  },
};
</script>

<style lang="scss" scoped></style>
