<template>
  <div>
    <button @click="changeComponent">改变组件，测试延迟分包加载</button>
    <component :is="cur"></component>

    <!-- 如果未下载完就显示fallback内的组件，下载完就显示default插槽内的 -->
    <!-- <suspense>
      <template #default>
        <async-component></async-component>
      </template>
      <template #fallback>
        <loading-component></loading-component>
      </template>
    </suspense> -->
  </div>
</template>

<script>
import MyCpn from "./MyCpn.vue";
import Loading from "./Loading.vue";
// import AsyncComponent from "./AsyncComponent.vue";
// 异步组件的使用有利于加快首页加载速度，将js分包，延迟加载(类似vue-router的异步组件)
import { defineAsyncComponent } from "vue";
const AsyncComponent = defineAsyncComponent(() => import("./AsyncComponent.vue"));
// const AsyncComponent = defineAsyncComponent({
//   loader: () => import("./AsyncComponent.vue"),
//   // 提前占位组件
//   loadingComponent: Loading,
//   // errorComponent
//   // 在显示loadingComponent之前等待时间
//   delay: 2000,
/**
 *
 * @param {*} error 错误信息对象
 * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
 * @param {*} fail  一个函数，指示加载程序结束退出
 * @param {*} attempts 允许的最大重试次数
 */
//   onError: function (error, retry, fail, attempts) {},
// });

export default {
  data() {
    return {
      cur: "MyCpn",
    };
  },
  methods: {
    changeComponent() {
      if (this.cur === "MyCpn") {
        this.cur = "AsyncComponent";
      } else {
        this.cur = "MyCpn";
      }
    },
  },
  components: {
    MyCpn,
    AsyncComponent,
  },
};
</script>

<style scoped>
.active {
  /* color: red; */
  background-color: red;
}
</style>
