<template>
  <!-- 多根节点必须显示绑定非props属性 -->
  <h2 v-bind="$attrs">{{ title }}</h2>
  <h3>{{ content }}</h3>
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
