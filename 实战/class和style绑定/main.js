import Vue from "./mudules/vue/index.js";
const vm = new Vue({
  el: "#app",
  data() {
    return {
      isShow: true,
      hasError: false,
      titleStyle: {
        color: "blue",
        fontSize: "20px",
      },
      titleShow: true,
      isContentBig: true,
      subTitleColor: "orange",
    };
  },
  template: `
  <div
  :class="[
    'box',
    isShow ? 'show' : '',
    hasError ? 'danger' : ''
  ]">
    <h1 :style="[
      titleStyle,{
        display: titleShow ? 'block' : 'none',
      }
    ]">This is Title</h1>
    <h2 :style="{
      display: titleShow ? 'block' : 'none',
      color: subTitleColor,
      fontSize: '20px'
    }">This is subTitle</h2>
    <p :class="{
      danger : hasError,
      big: isContentBig
    }">
      This is CONTENT
    </p>
  </div>
  `,
});
setTimeout(() => {
  vm.hasError = true;
  vm.subTitleColor = "purple";
}, 2000);
