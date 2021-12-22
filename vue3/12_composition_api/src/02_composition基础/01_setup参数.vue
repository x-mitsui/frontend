<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <h2>{{ counter }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
  /**
   * 1. props:父组件传递过来的属性
   */
  setup(props, context) {
    console.log("this是否为空", this);
    console.log("---", props.message);
    console.log("=============");
    // 非props属性
    console.log(context.attrs.id, context.attrs.class);
    console.log(context.slots);
    console.log(context.emit);
    console.log("=============");
    // 有了下面就没必要使用data了，而且它优先级也高于data
    return {
      title: "Haleo Mali",
      counter: 100,
    };
  },
};
</script>

<style scoped></style>
