<template>
  <div>
    <template v-for="(item, index) in info" :key="item">
      <slot :index="index">{{ index * 100 }}</slot>
      <slot name="IMSLOT" :item="item" :index="index"> </slot>
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
