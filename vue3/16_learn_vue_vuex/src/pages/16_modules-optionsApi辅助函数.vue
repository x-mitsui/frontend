<template>
  <h2>homeCounter:{{ homeCounter }}</h2>
  <h2>doubleHomeCounter:{{ doubleHomeCounter }}</h2>
  <button @click="increment">home+1</button>
  <button @click="incrementAction">action-home+1</button>
  <hr />
</template>

<script>
// 写法一、二 对应引入
// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
// 写法三 对应引入
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("home");
export default {
  computed: {
    // ...mapState({
    //   homeCounter: (state) => state.home.homeCounter,
    // }),
    // ...mapGetters({
    //   doubleHomeCounter: "home/doubleHomeCounter",
    // }),
    // 2. 写法二：
    // ...mapState("home", ["homeCounter"]),
    // ...mapGetters("home", ["doubleHomeCounter"]),
    // 3. 写法三：
    ...mapState(["homeCounter"]),
    ...mapGetters(["doubleHomeCounter"]),
  },

  methods: {
    // 1、写法一
    // ...mapMutations({ increment: "home/increment" }),
    // ...mapActions({ incrementAction: "home/incrementAction" }),
    // 2.写法二
    // ...mapMutations("home", ["increment"]),
    // ...mapActions("home", ["incrementAction"]),
    // 3.写法三
    ...mapMutations(["increment"]),
    ...mapActions(["incrementAction"]),
  },
};
</script>

<style></style>
