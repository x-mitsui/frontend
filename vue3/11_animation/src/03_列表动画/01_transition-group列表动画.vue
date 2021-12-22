<template>
  <div>
    <button @click="addNum">添加数字</button>
    <button @click="removeNum">删除数字</button>
    <button @click="shuffleNum">数字洗牌</button>
    <!-- tag设置包裹元素 -->
    <transition-group tag="p" name="ttc">
      <span v-for="item in numbers" :key="item" class="item">{{ item }}</span>
    </transition-group>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "App",
  data() {
    return {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      numCounter: 10,
    };
  },

  methods: {
    addNum() {
      // this.numbers.push(this.numCounter++);
      this.numbers.splice(this.randIndex(), 0, this.numCounter++);
    },
    removeNum() {
      this.numbers.splice(this.randIndex(), 1);
      this.numCounter--;
    },
    shuffleNum() {
      this.numbers = _.shuffle(this.numbers);
    },
    randIndex() {
      return Math.floor(Math.random() * this.numbers.length);
    },
  },
  components: {},
};
</script>

<style scoped>
.item {
  margin-right: 10px;
  display: inline-block;
}
/* 隐含了下面的一组样式 */
/* .ttc-enter-from,
.ttc-leave-to {
  opacity: 1;
  transform: translateY(0px);
} */
/* 隐含了上面一组样式 */
.ttc-enter-from,
.ttc-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.ttc-enter-active,
.ttc-leave-active {
  transition: all 1s ease;
}
/* 给需要移动的span元素添加动画，默认样式设置 */
.ttc-move {
  transition: transform 1s ease;
}
/* 脱标，不让这个元素挡住span元素移动位置 */
.ttc-leave-active {
  position: absolute;
}
</style>
