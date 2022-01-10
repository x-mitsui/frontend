import { generate } from "./generate.js";
import { parseTemplateToAst } from "./parseTemplateToAst.js";
import { patch } from "./patch.js";
import { _c, _v } from "./vnode.js";

class VM {
  constructor() {
    this._c = _c;
    this._v = _v;
  }
  mount(mark) {
    let el = document.querySelector(mark);
    // console.log("vmthis:", this);
    // el.innerHTML = this;
    this.$el = el;
    // this.update()
  }
}

const Vue = {
  createApp(opts) {
    const vm = new VM();
    const { data, template } = opts;
    this.initDatas(data, vm);

    const ast = parseTemplateToAst(template);
    console.log("ast:", ast);
    const code = generate(ast, opts);
    console.log("code:", code);

    const render = new Function(`with(this){
      return ${code};
    }`);
    const vnodeTree = render.call(vm);
    console.log("vnodeTree:", vnodeTree);
    this.initEvents(vnodeTree, opts);
    console.log("vnodeTree:", vnodeTree);
    opts.vm = vm;
    vm.vnodeTree = vnodeTree;
    vnodeTree.opts = opts;

    patch(document.querySelector("#app"), vnodeTree);
    return vm;
  },
  initDatas(data, vm) {
    // 对外暴露$data
    var _data = (vm.$data = data());

    // 将data数据访问“挂载”到实例vm上
    Object.keys(_data).forEach((key) => {
      console.log("key:", key);
      console.log("vm:", vm);
      let _self = this;
      Object.defineProperty(vm, key, {
        get() {
          return _data[key];
        },
        set(newVal) {
          _data[key] = newVal;
          _self.update(vm);
        },
      });
    });
  },

  initEvents(vnodeTree, opts) {
    const { methods } = opts;

    // console.log("vnodeTree.attrs:", vnodeTree.attrs);
    if (vnodeTree.attrs) {
      const keys = Object.keys(vnodeTree.attrs);
      if (keys.length > 0) {
        keys.forEach((key) => {
          if (key.slice(0, 1) == "@") {
            vnodeTree.attrs[key] = methods[vnodeTree.attrs[key]];
          }
        });
      }
    }

    if (vnodeTree.children && vnodeTree.children.length > 0) {
      vnodeTree.children.forEach((child) => {
        this.initEvents(child, opts);
      });
    }
  },
  render() {},
  update(vm) {
    patch(document.querySelector("#app"), vm.vnodeTree);
  },
};

export default Vue;
