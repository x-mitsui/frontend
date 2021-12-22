<template>
  <div>
    <my-slot-cpn>
      <template v-slot:left>
        <button>按钮1</button>
      </template>
      <template v-slot:center>
        <button>按钮2</button>
      </template>
      <template v-slot:right>
        <button>按钮2</button>
      </template>
    </my-slot-cpn>
  </div>
</template>

<script>
import MySlotCpn from "./MySlotCpn.vue";

export default {
  components: {
    MySlotCpn,
  },
};
</script>

<style scoped></style>
