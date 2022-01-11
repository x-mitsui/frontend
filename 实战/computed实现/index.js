/**
 * 需求：
 * 1. 将computed的结果值绑定到实例上（缓存）
 * 2. computed值会根据依赖值变化而变化
 *
 */

var Vue = (function () {
  /** 利用computedData收集所有计算属性信息
   * computedData值结构
   * total:{
   *   value:函数执行返回的结果,
   *   get,
   *   dependence:['a','b']
   * }
   */
  var computedData = {};
  var regExp = /\{\{(.*?)\}\}/g;
  // 建立属性和dom元素联系，一旦属性改变，dom元素内容也产生变化
  var dataPool = {};
  var Vue = function (options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data();

    this._init(this, options.computed, options.template);
  };

  Vue.prototype._init = function (vm, computed, template) {
    dataReactive(vm);
    computedReactive(vm, computed);

    render(vm, template);
  };

  function render(vm, template) {
    var container = document.createElement("div");
    var _el = vm.$el;

    container.innerHTML = template;
    var domTree = _compileTemplate(vm, container);
    _el.appendChild(domTree);
  }
  function update(vm, key) {
    dataPool[key].textContent = vm[key];
  }
  function _compileTemplate(vm, container) {
    var allNodes = container.getElementsByTagName("*");
    console.log("allNodes:", allNodes);
    [].forEach.call(allNodes, (node) => {
      var macthArr = node.textContent.match(regExp);
      if (macthArr) {
        node.textContent = node.textContent.replace(regExp, function ($0, $1) {
          console.log("$1:", $1);
          dataPool[$1.trim()] = node;
          return vm[$1.trim()];
        });
      }
    });
    return container;
  }
  function dataReactive(vm) {
    var _data = vm.$data;
    for (var key in _data) {
      (function (key) {
        Object.defineProperty(vm, key, {
          get() {
            return _data[key];
          },
          set(newValue) {
            _data[key] = newValue;
            update(vm, key);
            _updateComputedData(vm, key, function (key) {
              update(vm, _key);
            });
          },
        });
      })(key);
    }
  }
  // 将计算属性挂载到实例上
  function computedReactive(vm, computed) {
    _initComputedData(vm, computed);
    console.log("computedData:", computedData);
    for (const key in computedData) {
      if (Object.hasOwnProperty.call(computedData, key)) {
        Object.defineProperty(vm, key, {
          get() {
            return computedData[key].value;
          },
          set(newValue) {
            computedData[key].value = newValue;
          },
        });
      }
    }
  }
  function _initComputedData(vm, computed) {
    for (const key in computed) {
      if (Object.hasOwnProperty.call(computed, key)) {
        var descriptor = Object.getOwnPropertyDescriptor(computed, key);
        var descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;
        computedData[key] = {};
        computedData[key]["value"] = descriptorFn.call(vm);
        computedData[key]["get"] = descriptorFn.bind(vm);
        computedData[key]["dependence"] = _collectDep(descriptorFn);
      }
    }
  }
  // 分析依赖
  function _collectDep(fn) {
    console.log("111:", 111);
    var _collection = fn.toString().match(/this\.(.+?)/g);
    if (_collection.length > 0) {
      _collection = _collection.map((c, i) => {
        return c.split(".")[1];
      });
    }
    return _collection;
  }
  function _updateComputedData(vm, key, update) {
    var _dep = null;

    for (var key in computedData) {
      _dep = computedData[key].dependence;
      for (let i = 0; i < _dep.length; i++) {
        if (key == _dep[i]) {
          vm[key] = computedData[key].get();
          update(key);
        }
      }
    }
  }
  return Vue;
})();

export { Vue };
