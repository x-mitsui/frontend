<template>
  <div class="my-app">
    <tab-control :buttonItems="btnInfo" @changePageInfo="changeName"></tab-control>
    <h2>{{ curPageName }}</h2>
  </div>
</template>

<script>
import TabControl from "./TabControl.vue";
export default {
  data() {
    return {
      btnInfo: ["裤子", "衣服", "鞋", "裤衩"],
      curPageName: "",
    };
  },
  created() {
    this.curPageName = this.btnInfo[0];
  },
  methods: {
    changeName(index) {
      this.curPageName = this.btnInfo[index];
    },
  },
  components: {
    TabControl,
  },
};
</script>

<style scoped>
.my-app {
}
</style>
