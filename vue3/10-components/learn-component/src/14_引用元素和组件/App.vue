<template>
  <div class="main">
    <h2 ref="title">你好</h2>
    <button @click="btnClick">获取元素</button>
    <nav-bar ref="nav"></nav-bar>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  methods: {
    btnClick() {
      console.log(this.$refs.title);
      console.log(this.$refs.nav.message);
      console.log(this.$refs.nav.$el); //打印得出类为main的元素
      this.$refs.nav.test();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped></style>
