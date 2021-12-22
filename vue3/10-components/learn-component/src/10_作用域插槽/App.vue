<template>
  <div>
    <my-slot-cpn :info="names">
      <template v-slot="slotProps">
        <button>{{ slotProps.index }}-{{ slotProps.item }}</button>
      </template>
    </my-slot-cpn>

    <!-- 如果只有一个默认插槽可以使用省略写法 -->
    <my-slot-cpn :info="names" v-slot="slotProps">
      <ul style="background-color: red">
        <li>{{ slotProps.index + 1 }}-{{ slotProps.item }}</li>
      </ul>
    </my-slot-cpn>
    <hr />
    <!-- 具名插槽&&作用域插槽 -->
    <my-name-slot-cpn :info="names">
      <template v-slot:default="defaultSlotProps">
        <h2>{{ defaultSlotProps.index * 1111 }}</h2>
      </template>
      <template v-slot:IMSLOT="slotprops">
        <div>{{ slotprops.index }}:::{{ slotprops.item }}</div>
      </template>
    </my-name-slot-cpn>
  </div>
</template>

<script>
import MySlotCpn from "./MySlotCpn.vue";
import MyNameSlotCpn from "./MyNameSlotCpn.vue";

export default {
  data() {
    return {
      names: ["风", "火", "雷"],
    };
  },
  components: {
    MySlotCpn,
    MyNameSlotCpn,
  },
};
</script>

<style scoped></style>
