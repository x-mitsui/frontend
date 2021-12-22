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
    <!--内置组件二：keep-alive-->
    <!--默认情况下，切换组件会导致此组件被销毁再创建，状态不可保持，keep-alive解决了这个问题，保持了组件状态， -->
    <!-- 属性：include exclude  使用前需要给各子组件一个name属性-->
    <!-- 属性：max最多可以缓存多少组件实例，一旦达到数字，那么缓存组件中最近没有被访问的实例会被销毁 -->

    <!-- <keep-alive :include="/About|Home/"> -->
    <!-- <keep-alive :include="['About','Home']"> -->
    <keep-alive include="about,home">
      <component :is="curCpn"></component>
    </keep-alive>
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
