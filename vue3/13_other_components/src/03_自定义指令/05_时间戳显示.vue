<template>
  <div>
    <h2 v-time-format="'YYYY / MM / DD'">{{ timestamp }}</h2>
  </div>
</template>

<script>
import { ref } from "vue";
import dayjs from "dayjs";
export default {
  directives: {
    timeFormat: {
      // 一般这种工具类指令会抽取到全局
      mounted(el, bindings) {
        let formatString = "YYYY-MM-DD HH:mm:ss";
        if (bindings.value) {
          formatString = bindings.value;
        }
        const textContent = el.innerHTML;
        let timestamp = parseInt(textContent);
        if (textContent.length === 10) {
          timestamp *= 1000;
        }
        el.innerHTML = dayjs(timestamp).format(formatString);
        console.log();
      },
    },
  },
  setup() {
    const timestamp = ref("1640151443");
    return {
      timestamp,
    };
  },
};
</script>

<style scoped></style>
