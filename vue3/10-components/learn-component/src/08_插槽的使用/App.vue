<template>
  <div>
    <my-slot-cpn>
      <!-- 可以插入文本，html元素，自定义组件 -->
      <button>按钮</button>
    </my-slot-cpn>
    <my-slot-cpn-default></my-slot-cpn-default>
    <my-slot-cpn-default
      >这里内部所有内容将替换掉插槽<button>按钮</button><strong>汽车</strong></my-slot-cpn-default
    >
  </div>
</template>

<script>
import MySlotCpn from "./MySlotCpn.vue";
import MySlotCpnDefault from "./MySlotCpnDefault.vue";
export default {
  components: {
    MySlotCpn,
    MySlotCpnDefault,
  },
};
</script>

<style scoped></style>
