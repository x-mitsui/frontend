<template>
  <div>
    <h2>{{ mixInMessage }}</h2>
    <button @click="foo">按钮</button>
    <button @click="bar">bar按钮</button>
  </div>
</template>

<script>
/**如果Mixin对象中的选项和组件对象中的选项发生了冲突，那么Vue会如何操作呢?

 *情况一:如果是data函数的返回值对象
    返回值对象默认情况下会进行合并;
    如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据;
  情况二:如何生命周期钩子函数
    生命周期的钩子函数会被合并到数组中，都会被调用;先mixin的钩子，再组件的钩子
  情况三:值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。 
    比如都有methods选项，并且都定义了方法，那么它们都会生效;
    但是如果对象的key相同，那么会取组件对象的键值对;
 */
// 全局混入在main.js内
import { demoMixin } from "./mixins/demoMixin.js";

export default {
  name: "App",
  mixins: [demoMixin],
  data() {
    return {
      msg: "123",
    };
  },
  created() {
    console.log("组件created方法");
  },
  methods: {
    foo() {
      console.log("组件foo方法");
    },
  },
};
</script>

<style></style>
