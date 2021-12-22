<template>
  <div>
    <test1></test1>
    <test2 />
    <test3 />
  </div>
</template>

<script>
import Test1 from "./Test1.vue";
import Test2 from "./Test2.vue";
import Test3 from "./Test3.vue";
export default {
  components: {
    Test1,
    Test2,
    Test3,
  },
};
</script>

<style scoped></style>
