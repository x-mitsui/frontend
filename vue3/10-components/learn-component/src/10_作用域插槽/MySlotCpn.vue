<template>
  <div>
    <template v-for="(item, index) in info" :key="item">
      <slot :item="item" :index="index"> </slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
