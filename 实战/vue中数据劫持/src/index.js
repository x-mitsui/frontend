import Vue from "../vue/index.js";
let vm = new Vue({
  data() {
    return {
      title: "学生列表",
      classNum: 1,
      total: 2,
      teacher: ["Jim", "Tom"],
      info: {
        a: {
          b: 1,
        },
      },
      students: [
        {
          id: 1,
          name: "JACK",
        },
        {
          id: 2,
          name: "MIKE",
        },
      ],
    };
  },
});
// console.log("vm.title:", vm.title);
// console.log("vm.info:", vm.info);
// console.log("vm.info.a:", vm.info.a);
// console.log("vm.info.a.b:", vm.info.a.b);
// console.log('vm.teacher:',vm.teacher)
// console.log('vm.teacher[0]:',vm.teacher[0])
// console.log('vm.students[0]:',vm.students[0])
// console.log('vm.students[0].id:',vm.students[0].id)
// console.log("vm.students.push(3):", vm.students.push(3));
// vm.info.a = { c: 8 };
vm.students.splice(1, 1, { id: 3, name: "KING" });
// console.log("vm:", vm);
