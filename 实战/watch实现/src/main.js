import Vue from "../modules/vue/index.js";

const vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  computed: {
    total() {
      console.log("11:", 11);
      return this.a + this.b;
    },
  },
  watch: {
    total(newValue, oldValue) {
      console.log(
        `watch -- total - %cnewValue: ${newValue} ,%coldValue: ${oldValue}`,
        "color:red",
        "color:green"
      );
    },
    a(newValue, oldValue) {
      console.log(
        `watch -- a - %cnewValue: ${newValue} ,%coldValue: ${oldValue}`,
        "color:red",
        "color:green"
      );
    },
    b(newValue, oldValue) {
      console.log(
        `watch -- b - %cnewValue: ${newValue} ,%coldValue: ${oldValue}`,
        "color:red",
        "color:green"
      );
    },
  },
});

console.log("vm:", vm);
console.log("vm.total1:", vm.total);
console.log("vm.total2:", vm.total);
console.log("vm.total3:", vm.total);

vm.a = 100;

console.log("vm.total4:", vm.total);
console.log("vm.total5:", vm.total);
console.log("vm.total6:", vm.total);

vm.b = 200;

console.log("vm.total7:", vm.total);
console.log("vm.total8:", vm.total);
console.log("vm.total9:", vm.total);
