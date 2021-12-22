<template>
  <div>
    <!-- 组件上用v-model -->
    <super-input v-model="message"></super-input>
    <!-- 相当于 -->
    <!-- <super-input :modelValue="message" @update:model-value="message = $event"></super-input> -->
    {{ message }}
  </div>
</template>

<script>
import SuperInput from "./SuperInput.vue";
export default {
  data() {
    return {
      message: "传递给子组件",
    };
  },
  components: {
    SuperInput,
  },
};
</script>

<style scoped></style>
