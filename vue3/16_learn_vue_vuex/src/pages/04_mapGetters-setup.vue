<template>
  <h2>所有图书的总价格：{{ $store.getters.totalPrice }}</h2>
  <h2>数量大于2的图书的总价格：{{ $store.getters.totalPriceCountMorethanN(2) }}</h2>
  <h2>{{ nameInfo }}</h2>
  <h2>{{ ageInfo }}</h2>
</template>

<script>
import useGetters from "../hooks/useGetters";
export default {
  setup() {
    return {
      ...useGetters(["nameInfo", "ageInfo"]),
    };
  },
  components: {},
};
</script>

<style></style>
