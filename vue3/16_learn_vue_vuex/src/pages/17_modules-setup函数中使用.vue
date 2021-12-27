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
import useState from "../hooks/useState";
import useGetters from "../hooks/useGetters";
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers("home");
export default {
  setup() {
    const state = useState("home", ["homeCounter"]);
    const getters = useGetters("home", ["doubleHomeCounter"]);

    const mutations = mapMutations(["increment"]);
    const actions = mapActions(["incrementAction"]);
    return {
      ...state,
      ...getters,
      ...mutations,
      ...actions,
    };
  },
};
</script>

<style></style>
