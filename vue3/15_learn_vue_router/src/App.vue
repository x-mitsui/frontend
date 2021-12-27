<template>
  <!-- 作用域插槽，属性v-slot="props"，另外设置router-link设置custom属性，会导致默认默认事件失效，若依然想恢复默认事件效果，需要手动绑定，可以绑定props.navigate函数 -->
  <!-- props.isActive 当前router-link是否处于活跃状态 -->
  <!-- props.isExactActive 当前router-link是否处于活跃状态 -->
  <!-- props.route route对象 -->
  <!-- props.href 跳转的链接 -->
  <router-link to="/home" v-slot="props">
    <!-- 默认插槽，可以是普通元素或者组件 -->
    <button>首页</button>
    <!-- <p>{{ props.href }}</p> -->
  </router-link>
  <router-link to="/about">关于</router-link>
  <router-link :to="'/user/' + username + '/id/' + id">用户</router-link>
  <!-- 具体情况是否添加依情况而定 -->
  <router-link to="/category">分类</router-link>

  <router-view v-slot="props">
    <transition name="playII">
      <keep-alive>
        <component :is="props.Component"></component>
      </keep-alive>
    </transition>
  </router-view>
  <button @click="jumpToAbout">代码跳转到关于页</button>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "App",
  data() {
    return {
      username: "张三",
      id: 13,
    };
  },
  setup() {
    const router = useRouter();
    const jumpToAbout = function () {
      // router.push("/about");
      router.push({
        path: "/about",
        query: {
          name: "shangsan",
          age: 12,
        },
      });
      /** 其它方法
       * router.go(2)
       * router.go(-1)
       * router.forward()
       * router.back()
       */
    };
    return {
      jumpToAbout,
    };
  },
  // options写法，跳转路由
  // methods: {
  //   jumpToAbout() {
  //     this.$router.push("/about");
  //   },
  // },
};
</script>

<style>
/* 设置链接激活时的样式 */
.router-link-active {
  color: red;
}
/* 精准匹配，路径和link精准匹配 */
.router-link-exact-active {
  color: yellowgreen;
}
.playII-enter-from,
.playII-leave-to {
  opacity: 0;
  position: absolute;
}
.playII-enter-to,
.playII-leave-from {
  position: block;
}
.playII-enter-active,
.playII-leave-active {
  transition: opacity 0.1s ease;
}
</style>
