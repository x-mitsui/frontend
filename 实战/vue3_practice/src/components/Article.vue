<template>
  <div>
    <my-title :tl="title" @upper="upper">{{ title }}</my-title>
    <my-author>{{ author }}</my-author>
    <my-content>{{ content }}</my-content>
  </div>
</template>

<script>
const MyTitle = {
  template: "<h2 :title='tl' @click='upper'>title:<slot></slot></h2>",
  props: { tl: String },
  emits: ["upper"],
  methods: {
    upper() {
      this.$emit("upper");
    },
  },
};
const MyAuthor = {
  template: "<h2>author:<slot></slot></h2>",
};
const MyContent = {
  template: "<h2>content:<slot></slot></h2>",
};
export default {
  data() {
    return {
      title: "title1",
      author: "Jack",
      content: "zfsf sfsf sfsfs sfsfs sfsfs cce",
    };
  },
  methods: {
    upper() {
      this.title = this.title.toUpperCase();
    },
  },
  components: {
    MyTitle,
    MyAuthor,
    MyContent,
  },
  mounted() {
    // 打印组件实例
    console.log("this component instance", this);
  },
};
</script>

<style lang="scss" scoped></style>
