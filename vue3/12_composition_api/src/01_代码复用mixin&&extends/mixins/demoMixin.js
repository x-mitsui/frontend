export const demoMixin = {
  data() {
    return {
      mixInMessage: "hello world",
    };
  },
  methods: {
    foo() {
      console.log("mixin foo function......");
    },
    bar() {
      console.log("mixin bar方法");
    },
  },
  created() {
    console.log("mixin created function......");
  },
};
