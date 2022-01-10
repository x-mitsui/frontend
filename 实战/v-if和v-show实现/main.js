import Vue from "./core/index.js";
const App = {
  data() {
    return {
      isShowImg1: false,
      isShowImg2: true,
    };
  },
  template: `
  	<div>
    	<div>
      	<img v-if='isShowImg1' src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
        <img v-show='isShowImg2' src='https://www.baidu.com/img/flexible/logo/pc/result.png'/>
      </div>

      <button @click='changeShowImg1'>显示图片1</button>
      <button @click='changeShowImg2'>显示图片2</button>
    </div>
  `,
  //   template: `

  // <div>
  // <button @click='changeShowImg1'>显示图片1</button>
  //       <button @click='changeShowImg2'>显示图片2</button>
  // </div>

  //   `,
  methods: {
    changeShowImg1() {
      console.log("this>>:", this);
      this.isShowImg1 = !this.isShowImg1;
    },
    changeShowImg2() {
      this.isShowImg2 = !this.isShowImg2;
    },
  },
};
Vue.createApp(App).mount("#app");
