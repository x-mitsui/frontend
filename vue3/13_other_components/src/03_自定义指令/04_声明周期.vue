<template>
  <div>
    <button v-if="counter <= 5" @click="counter++" v-test-life.aaa.bbb="'hello'">
      测试{{ counter }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  directives: {
    testLife: {
      created() {
        console.log("created");
      },
      beforeMount(el, bindings, vnode, preNode) {
        console.log("beforeMount");
      },
      mounted(el, bindings, vnode, preNode) {
        console.log(" mounted");
        // 参数
        console.log(bindings.value);
        // 修饰符，判断是否有某一修饰符，进而进行某种操作
        console.log(bindings.modifiers);
      },
      beforeUpdate(el, bindings, vnode, preNode) {
        console.log(" beforeUpdate");
      },
      updated(el, bindings, vnode, preNode) {
        console.log(" updated");
      },
      beforeUnmount(el, bindings, vnode, preNode) {
        console.log(" beforeUnmount");
      },
      unmounted(el, bindings, vnode, preNode) {
        console.log(" unmounted");
      },
    },
  },
  setup() {
    return {
      counter: ref(0),
    };
  },
};
</script>

<style scoped></style>
