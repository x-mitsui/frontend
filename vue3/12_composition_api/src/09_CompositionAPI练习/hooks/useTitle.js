import { ref, watch } from "vue";
export default function (title = "默认标题") {
  const titleRef = ref(title);
  // 关键意图：监听titleRef的变化，变化后自动修改title，不需要手头修改了
  watch(
    titleRef,
    (newValue) => {
      document.title = newValue;
    },
    {
      immediate: true,
    }
  );
  return titleRef;
}
