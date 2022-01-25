<template>
  <div>
    <todo-list></todo-list>
    <hr />
    <my-article></my-article>
    <hr />

    <table class="tb">
      <thead class="header">
        <tr>
          <th>老师名</th>
          <th>学科</th>
          <th>受欢迎人数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="k in TeacherList" :key="k.id">
          <td>{{ k.name }}</td>
          <td>{{ k.subject }}</td>
          <td>{{ k.like }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="getTeachers">获取数据</button>
  </div>
</template>

<script>
import axios from "axios";
import TodoList from "./components/TodoList.vue";
import MyArticle from "./components/Article.vue";

export default {
  data() {
    return {
      mes: "hello world",
      TeacherList: [],
    };
  },
  components: {
    TodoList,
    MyArticle,
  },
  methods: {
    async getTeachers() {
      const result = await axios("http://localhost:8080/getTeachers");
      console.log(result);
      this.TeacherList = result.data;
    },
  },
};
</script>

<style scoped>
.tb {
  border: 1px solid red;
  border-collapse: collapse;
}
.tb th,
.tb td {
  border: 1px solid red;
}
</style>
