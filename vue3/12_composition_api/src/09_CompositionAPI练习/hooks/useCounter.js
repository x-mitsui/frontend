import { ref, computed } from "vue";
export default function () {
  const Counter = ref(0);
  const increment = function () {
    Counter.value++;
  };
  const decrement = function () {
    Counter.value--;
  };
  const DoubleCounter = computed(() => Counter.value * 2);
  return {
    Counter,
    DoubleCounter,
    increment,
    decrement,
  };
}
