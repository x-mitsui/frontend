import { useStore } from "vuex";

import { computed } from "vue";
export default function (mapper, mapFn) {
  const store = useStore();
  // 计算属性的一种写法
  // const sCounter = computed(() => store.state.counter);
  // const sCounter = computed(() => store.getters.counter);

  // 计算属性的另一种写法
  const storemapperFns = mapFn(mapper);
  const storeMapper = {};
  Object.keys(storemapperFns).forEach((fnKey) => {
    const fn = storemapperFns[fnKey].bind({ $store: store });
    storeMapper[fnKey] = computed(fn);
  });
  return storeMapper;
}
