import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

// import Home from "../pages/Home.vue";
// import About from "../pages/About.vue";

// 配置映射关系
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    // 可以携带数据
    meta: {
      data: 123,
      //~~~~
    },
    // 可以添加name属性
    name: "about",
    path: "/about",
    // 路由懒加载，导出分包，优化首屏加载速度
    component: () => import("../pages/About.vue"),
  },
  {
    path: "/home",
    // 在注释中设置webpackChunkName来改变导出包名
    component: () => import(/*webpackChunkName:"home-chunk"*/ "../pages/Home.vue"),
    //嵌套路由
    children: [
      {
        path: "",
        redirect: "/home/message",
      },
      {
        path: "message", //注意格式
        component: () => import("../pages/HomeMessage.vue"),
      },
      {
        path: "shops", //注意格式
        component: () => import("../pages/HomeShop.vue"),
      },
    ],
  },
  {
    // 动态路由: 满足下面path的格式，才会进入User.vue组件
    // 作用：可以在路径上体现出具体的‘username’，可以让页面内容刷新后不缺失
    path: "/user/:username/id/:id",
    component: () => import("../pages/User.vue"),
  },
  {
    // path: "/:pathMatch(.*)",
    path: "/:pathMatch(.*)*", //注意两种写法区别
    component: () => import("../pages/NotFound.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
    // 内部也可以使用单独使用守卫
  },
];

// 创建一个路由对象router
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 动态添加路由
const categoryRoute = {
  path: "/category",
  component: () => import("../pages/Category.vue"),
};

router.addRoute(categoryRoute);

// 动态添加二级路由
router.addRoute("home", {
  path: "/moment",
  component: () => import("../pages/HomeMoment.vue"),
  // children:[]
});

// 删除路由的三种方式
// 1
/*
router.addRoute({ path: "/about", name: "about", component: About });
// 这将会删除之前已经添加的路由，因为它们具有相同的名字且名字必须是唯一的
router.addRoute({ path: "/other", name: "about", component: Home });
*/

// 2
/*
router.removeRoute("about");
*/
// 3 执行句柄来删除
/*
const removeRoute = router.addRoute(routeRecord);
removeRoute()//删除路由，如果存在的话
*/

// 其它方法
// router.hasRoute() //检测路由是否存在
// router.getRoutes() //获取一个包含所有路由记录的数组

// 导航首位
let counter = 0;
// to: Route对象，即将跳转到的Route对象
// from: Route对象，从哪一个Route对象跳转过来的
// next：第三个参数不推荐使用了
// 返回值：
// 1.如果返回false不进行导航，
//  如果返回undefined或者不写返回值，就进行默认导航
// 2.字符串：如果是路径，就跳转到对应的路径中
// 4.对象，router.push(path:"login",query:....)
router.beforeEach((to, from) => {
  // 可以判断to.path或from.path
  console.log("进行了" + ++counter + "次路由跳转：");
  // if (to.path.indexOf("home") != -1) {
  //   return "/login";
  // }
  if (to.path != "/login") {
    if (!window.localStorage.getItem("token")) {
      return "/login";
    }
  }
});
export default router;
