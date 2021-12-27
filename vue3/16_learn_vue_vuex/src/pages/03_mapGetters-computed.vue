<template>
  <h2>所有图书的总价格：{{ $store.getters.totalPrice }}</h2>
  <h2>数量大于2的图书的总价格：{{ $store.getters.totalPriceCountMorethanN(2) }}</h2>
  <h2>{{ nameInfo }}</h2>
  <h2>{{ ageInfo }}</h2>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // 两种简便引入写法
    // ...mapGetters(["nameInfo", "ageInfo"]),
    ...mapGetters({ sNameInfo: "nameInfo", sAgeInfo: "ageInfo" }),
  },
  components: {},
};
</script>

<style></style>
