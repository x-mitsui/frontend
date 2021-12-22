<template>
  <div class="hello">
    <!-- <h2 :class="$attrs.class">{{ title }}</h2> -->
    <h2 v-bind="$attrs">{{ title }}</h2>
    <h3>{{ content }}</h3>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["title", "content"],
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
