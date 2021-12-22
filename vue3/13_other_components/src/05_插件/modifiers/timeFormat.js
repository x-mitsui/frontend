import dayjs from "dayjs";
export default function (app) {
  let formatString = "YYYY-MM-DD HH:mm:ss";
  app.directive("format-time-by-plugin", {
    created(el, bindings) {
      if (bindings.value) {
        formatString = bindings.value;
      }
    },
    mounted(el, bindings) {
      let textContent = el.textContent;
      let timestamp = parseInt(textContent);
      if (textContent.length === 10) {
        timestamp *= 1000;
      }
      el.innerHTML = dayjs(timestamp).format(formatString);
    },
  });
}
