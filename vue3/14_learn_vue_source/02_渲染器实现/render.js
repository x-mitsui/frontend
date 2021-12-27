const h = (tag, props, children) => {
  console.log("h函数-----");
  // 返回一个vnode
  return {
    tag,
    props,
    children,
  };
};

const mountVnode = (vnode, container) => {
  console.log("挂载操作------");
  // 1.虚拟dom转化为真实dom
  const el = (vnode.el = document.createElement(vnode.tag));
  // 2.处理props
  for (const key in vnode.props) {
    if (Object.hasOwnProperty.call(vnode.props, key)) {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  // 3.处理children
  const children = vnode.children;
  if (children) {
    if (typeof children == "string") {
      el.textContent = children;
    } else {
      children.forEach((vnode) => {
        mountVnode(vnode, el);
      });
    }
  }
  // 4.el挂载到container
  container.appendChild(el);
};

const patch = (v_old, v_new) => {
  // 如果连类型都不一样就不用比了
  if (v_old.tag !== v_new.tag) {
    const v_old_el_parent = v_old.el.parentElement;
    v_old_el_parent.removeChild(v_old.el);
    mount(v_new, v_old_el_parent);
  } else {
    const el = (v_new.el = v_old.el);
    const new_props = v_new.props || {};
    const old_props = v_old.props || {};
    // 2.1获取新props，添加到el上
    for (const key in new_props) {
      if (new_props.hasOwnProperty(key)) {
        const new_value = new_props[key];
        const old_value = old_props[key];
        if (new_value !== old_value) {
          if (key.startsWith("on")) {
            el.addEventListener(key.slice(2).toLowerCase(), new_value);
          } else {
            el.setAttribute(key, new_value);
          }
        }
      }
    }
    // 2.2删除旧的props
    for (const key in old_props) {
      if (new_props.hasOwnProperty(key)) {
        if (key.startsWith("on")) {
          const old_value = old_props[key];
          el.removeEventListener(key.slice(2).toLowerCase(), old_value);
        }
        if (!new_props.hasOwnProperty(key)) {
          el.removeAttribute(key);
        }
      }
    }
    // 3.处理children
    const old_children = v_old.children || [];
    const new_children = v_new.children || [];
    if (typeof new_children === "string") {
      if (typeof old_children === "string") {
        if (old_children !== new_children) {
          // 这里之所以不用textContent可以看根目录下的test.html
          el.innerText = new_children;
        }
      } else {
        el.innerHTML = new_children;
      }
    } else {
      // 当为数组时，暂不考虑对象

      if (typeof old_children == "string") {
        new_children.forEach((v_node) => {
          mount(v_node, el);
        });
      } else {
        // 新老children都是数组，需要多情况分析
        // old_children: [v1, v2, v3]
        // new_children: [v1, v5, v6, v8]
        const commonLength = Math.min(old_children.length, new_children.length);
        for (let i = 0; i < commonLength; i++) {
          patch(old_children[i], new_children[i]);
        }
        // debugger;
        if (commonLength < old_children.length) {
          for (let i = commonLength; i < old_children.length; i++) {
            // old_children[i].el.parentElement.removeChild(old_children[i].el);
            el.removeChild(old_children[i].el);
          }
        }
        if (commonLength < new_children.length) {
          for (let i = commonLength; i < new_children.length; i++) {
            mount(new_children[i], el);
          }
        }
      }
    }
  }
};
