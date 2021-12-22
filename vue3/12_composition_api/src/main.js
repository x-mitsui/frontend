import { createApp } from "vue";
import App from "./09_CompositionAPI练习/App.vue";
const app = createApp(App);
app.mixin({
  data() {
    return {};
  },
  methods: {},
  created() {
    console.log("全局的created声明周期");
  },
});
app.mount("#app");
