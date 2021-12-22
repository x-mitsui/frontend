<template>
  <ul class="list">
    <li
      v-for="(item, index) in buttonItems"
      :key="item"
      @click="emitEvent(index)"
      :class="{ active: curIndex === index }"
    >
      <span>{{ item }}</span>
    </li>
    <!-- <li><button>衣服</button></li>
    <li><button>裤子</button></li>
    <li><button>鞋</button></li> -->
  </ul>
</template>

<script>
export default {
  data() {
    return {
      curIndex: 0,
    };
  },
  emits: ["changePageInfo"],
  props: ["buttonItems"],
  methods: {
    emitEvent(index) {
      if (this.curIndex === index) return;
      this.curIndex = index;
      this.$emit("changePageInfo", index);
    },
  },
};
</script>

<style scoped>
body,
ul,
li {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.list {
  display: flex;
}
.list li {
  flex: 1;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.active span {
  font-weight: bold;
  color: #ff5000;
  padding: 3px;
  border-bottom: 2px solid rgb(223, 21, 21);
}
</style>
