<template>
  <div>
    <input type="number" step="100" v-model="counter" />
    <h2>{{ showCounter }}</h2>
    <h2>{{ showNumber.toFixed(0) }}</h2>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "App",
  data() {
    return {
      counter: 0,
      showNumber: 0,
    };
  },
  computed: {
    showCounter() {
      return this.showNumber.toFixed(0);
    },
  },
  watch: {
    counter(newValue) {
      gsap.to(this, { duration: 1, showNumber: newValue });
    },
  },
  methods: {
    beforeEnter() {},
    enter(el, done) {
      gsap.from(el, {
        scale: 0,
        y: this.distance,
        duration: 1,
        onComplete: done,
      });
    },
    afterEnter() {},
    enterCancelled() {},
    //
    beforeLeave() {},
    leave(el, done) {
      gsap.to(el, {
        scale: 0,
        y: this.distance,
        duration: 1,
        onComplete: done,
      });
    },
    afterLeave() {},
    leaveCancelled() {},
  },
  components: {},
};
</script>

<style scoped>
.box {
  width: 100px;
}
h2 {
  background-color: red;
  text-align: center;
}
</style>
