const HomeModule = {
  namespaced: true,
  state() {
    return {
      homeCounter: 10,
    };
  },
  getters: {
    doubleHomeCounter(state, getters, rootState, rootGetters) {
      return state.homeCounter * 2;
    },
    otherGetter(state, getters, rootState, rootGetters) {
      return "klll";
    },
  },
  mutations: {
    increment(state) {
      state.homeCounter++;
    },
  },
  actions: {
    // 内部属性比store多rootState，rootGetters
    incrementAction({ commit, dispatch, state, rootState, getters, rootGetters }) {
      commit("increment");
      // 调用根模块的方法 root:true，不传参就设置为null
      commit("increment", null, { root: true });
      // dispatch("incrementAction", null, { root: true });
    },
  },
};
export default HomeModule;
