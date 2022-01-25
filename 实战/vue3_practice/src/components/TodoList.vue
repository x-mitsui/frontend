<template>
  <div>
    <input type="text" v-model="inputVal" /><button @click="addItem">增加</button>
    <ul>
      <li v-for="item in dataRef" :key="item.id">
        <input type="checkbox" :checked="item.completed" @click="toggle(item.id)" />
        <span :class="{ lineThrough: item.completed }">{{ item.content }}</span>
        <button @click="removeTodo(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const data = [
      {
        id: 1,
        content: "234",
        completed: false,
      },
      {
        id: 2,
        content: "223",
        completed: false,
      },
      {
        id: 3,
        content: "453",
        completed: false,
      },
    ];
    const dataRef = ref(
      data.filter((item) => {
        return !item.completed;
      })
    );
    const inputVal = ref("");
    let baseIndex = 3;

    const removeTodo = (id) => {
      dataRef.value = dataRef.value.filter((item, index) => {
        return item.id != id;
      });
    };
    const addItem = () => {
      if (inputVal.value == "") {
        console.log("值为空，无法添加");
        return;
      }
      const obj = {
        id: ++baseIndex,
        content: inputVal.value,
        completed: false,
      };

      dataRef.value.push(obj);
      inputVal.value = "";
    };
    const toggle = function (id) {
      dataRef.value.forEach((item) => {
        console.log(id);
        if (id === item.id) {
          item.completed = !item.completed;
        }
      });
    };
    return {
      dataRef,
      inputVal,
      //
      removeTodo,
      addItem,
      toggle,
    };
  },
};
</script>

<style scoped>
.lineThrough {
  text-decoration: line-through;
}
</style>
