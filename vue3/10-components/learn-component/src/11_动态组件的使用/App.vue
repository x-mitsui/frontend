<template>
  <div>
    <button
      v-for="(item, index) of tabs"
      :key="item"
      :class="{ active: curIndex === index }"
      @click="touch(index)"
    >
      {{ item }}
    </button>

    <!-- v-if实现 -->
    <!-- <template v-if="curCpn == 'home'">
      <home />
    </template>
    <template v-else-if="curCpn == 'category'">
      <category />
    </template>
    <template v-else>
      <about />
    </template> -->

    <!-- 动态组件 is值为全局注册的组件名或者局部注册的组件名-->
    <component :is="curCpn" :name="'小三'" @transmit="transmit"></component>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import Category from "./pages/Category.vue";
import About from "./pages/About.vue";
export default {
  data() {
    return {
      curIndex: 0,
      tabs: ["home", "about", "category"],
      curCpn: "home",
    };
  },
  methods: {
    touch(idex) {
      this.curIndex = idex;
      this.curCpn = this.tabs[idex];
    },
    transmit(info) {
      console.log(info);
    },
  },
  components: {
    Home,
    Category,
    About,
  },
};
</script>

<style scoped>
.active {
  /* color: red; */
  background-color: red;
}
</style>
