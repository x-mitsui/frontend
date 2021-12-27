import { createStore } from "vuex";
import { INCREMENT_N } from "./mutation-types";

import axios from "axios";
const store = createStore({
  state() {
    return {
      counter: 0,
      name: "zzz",
      age: 11,
      height: 1.8,
      books: [
        { name: "xxx", price: 1, count: 3 },
        { name: "yyy", price: 2, count: 2 },
        { name: "zzz", price: 3, count: 1 },
      ],
      discount: 1,
    };
  },
  getters: {
    totalPrice(state, getters) {
      const normalTotal = state.books.reduce((pre, cur, index, arr) => {
        return pre + cur.price * cur.count;
      }, 0);
      const withDiscount = normalTotal * getters.curDiscount;
      return "￥" + withDiscount;
    },
    curDiscount(state) {
      return state.discount * 0.5;
    },
    // 如何往getters里传参数
    totalPriceCountMorethanN(state, getters) {
      return function (n) {
        return (
          "￥" +
          state.books.reduce((pre, cur, index, arr) => {
            if (cur.count > n) {
              return pre + cur.price * cur.count;
            } else {
              return pre;
            }
          }, 0) *
            getters.curDiscount
        );
      };
    },
    nameInfo(state) {
      return "name:" + state.name;
    },
    ageInfo(state) {
      return "age:" + state.age;
    },
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    [INCREMENT_N](state, payload) {
      state.counter += payload.value;
      console.log(payload.otherNum);
    },
    decrementN(state, payload) {
      state.counter -= payload;
    },
    addBannerData(state, payload) {
      state.banners = payload;
    },
  },
  actions: {
    incrementAction(context, playload) {
      console.log(playload);
      setTimeout(() => {
        context.commit("increment");
      }, 1000);
    },
    decrementAction({ commit, dispatch, getters, rootGetters, rootState, state }) {
      commit("decrement");
    },
    getHomeMultidata(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://123.207.32.32:8000/home/multidata")
          .then((res) => {
            // console.log(res.data.data.banner);
            context.commit("addBannerData", res.data.data.banner.list);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

export default store;
