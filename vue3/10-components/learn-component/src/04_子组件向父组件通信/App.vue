<template>
  <div>
    <h2>{{ count }}</h2>
    <child-a @transmit="resolve"></child-a>
  </div>
</template>

<script>
import ChildA from "./ChildA.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    ChildA,
  },
  methods: {
    resolve(msg) {
      console.log(msg);
      this.count += msg;
    },
  },
};
</script>

<style scoped></style>
