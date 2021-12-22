<template>
  <div>
    <h2>我是app的字</h2>
    <hello-world title="田" content="风湿手术"></hello-world>
    <hello-world :title="info.title" :content="info.content"></hello-world>
    <hello-world v-bind="info" class="kk" id="vv"></hello-world>
    <com-2 v-bind="info" :age="14"></com-2>
    <multi-node class="mm" id="hh"></multi-node>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
import Com2 from "./Com2.vue";
import MultiNode from "./MultiNode.vue";
export default {
  components: { HelloWorld, Com2, MultiNode },
  data() {
    return {
      info: {
        title: "标题",
        content: "内容",
      },
    };
  },
};
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
