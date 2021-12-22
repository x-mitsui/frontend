<template>
  <div>
    <input type="text" v-model="keyword" />
    <transition-group
      tag="ul"
      name="ttc"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <li v-for="(item, index) in showNames" :key="item" class="item" :data-index="index">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "App",
  data() {
    return {
      names: ["abc", "dsds", "ior", "kls", "sdcs", "ggss", "lpoe", "av", "nba"],
      keyword: "",
    };
  },
  computed: {
    showNames() {
      return this.names.filter((item) => item.indexOf(this.keyword) != -1);
    },
  },
  methods: {
    beforeEnter(el, done) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "1.5em",
        delay: el.dataset.index * 0.5,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        onComplete: done,
      });
    },
  },
  components: {},
};
</script>

<style scoped>
.ttc-enter-from,
.ttc-leave-to {
  opacity: 0;
}
.ttc-enter-active,
.ttc-leave-active {
  transition: all 0.5s ease;
}
/* .ttc-move {
  transition: transform 0.5s ease;
}
.ttc-leave-active {
  position: absolute;
} */
</style>
