import { Vue } from "./index.js";

var vm = new Vue({
  el: "#app",
  template: `
  <span>{{a}}</span>
  <span>+</span>
  <span>{{b}}</span>
  <span>=</span>
  <span>{{total}}</span>
  `,
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  computed: {
    // total() {
    //   return this.a + this.b;
    // },
    total: {
      get() {
        return this.a + this.b;
      },
    },
  },
});
console.log("vm:", vm);
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
vm.a = 100;
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
console.log("vm.total:", vm.total);
