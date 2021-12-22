<template>
  <div>
    {{ counter }}
    {{ keepValue.number }}
    {{ keepValue2.number }}

    {{ readOnly_refValue.number }}
    <button @click="increment">增加</button>
    <button @click="keepValueAdd">测试readOnly</button>
    <button @click="keepValueAdd2">测试readOnly2</button>
    <button @click="refValueChange">测试ref的readOnly2</button>
  </div>
</template>

<script>
import { ref, reactive, readonly } from "vue";
export default {
  props: {
    message: {
      type: String,
    },
  },
  setup() {
    let counter = ref(100);
    let increment = () => {
      counter.value++;
    };
    // 普通对象
    let keepValue = readonly({ number: 100 });
    let keepValueAdd = () => {
      keepValue.number++;
    };
    // 响应式对象reactive
    let reactValue = reactive({ number: 100 });
    let keepValue2 = readonly(reactValue);
    // 可用来限制别人修改,而且readonly管控所有深度
    let keepValueAdd2 = () => {
      keepValue2.number++;
    };
    // 但自己可以修改
    let reactValueChange = () => {
      reactValue.number++;
    };
    // 响应式对象ref
    let refValue = ref({ number: 100 });
    let readOnly_refValue = readonly(refValue);
    console.log(readOnly_refValue.value.number);
    // 可用来限制别人修改
    let readOnly_refValueAdd2 = () => {
      readOnly_refValue.number++;
    };
    // 但自己可以修改
    let refValueChange = () => {
      readOnly_refValue.number++;
    };
    return {
      counter,
      increment,
      keepValue,
      keepValueAdd,
      keepValue2,
      keepValueAdd2,
      reactValueChange,
      refValue,
      readOnly_refValue,
      refValueChange,
    };
  },
};
</script>

<style scoped></style>
