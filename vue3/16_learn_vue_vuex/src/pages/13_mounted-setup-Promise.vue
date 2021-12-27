<template>
  <h2>
    异步请求列表信息：
    <ul>
      <li v-for="item in $store.state.banners" :key="item">
        <a :href="item.link"><img :src="item.image" alt="" /></a>
      </li>
    </ul>
  </h2>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  computed: {
    sCounter() {
      return this.$store.state.counter;
    },
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store
        .dispatch("getHomeMultidata")
        .then((res) => {
          console.log("end:", res);
        })
        .catch((err) => {
          console.log("end:", err);
        });
    });
  },
};
</script>

<style></style>
