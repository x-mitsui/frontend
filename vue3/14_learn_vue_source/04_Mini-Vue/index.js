const createApp = (rootComponent) => {
  // 把rootComponent携带信息转化为元素，挂载到dom上
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let old_vnode;
      run(() => {
        if (!isMounted) {
          old_vnode = rootComponent.render();
          mountVnode(old_vnode, container);
          isMounted = true;
        } else {
          console.log("xxxxx");
          const new_vnode = rootComponent.render();
          patch(old_vnode, new_vnode);
          old_vnode = new_vnode;
        }
      });
    },
  };
};
