function createElement(vnode) {
  const { tag, attrs, children, text, direactives } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    updateAttrs(vnode);
    children.forEach((child) => {
      child.opts = vnode.opts;
      vnode.el.appendChild(createElement(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateAttrs(vnode) {
  let { el, direactives, opts } = vnode;
  console.log("vnode----:", vnode);
  if (direactives.hasOwnProperty("show")) {
    const value = direactives["show"];
    const isShow = opts.vm[value];
    if (isShow) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }
  if (direactives.hasOwnProperty("if")) {
    const value = direactives["if"];

    const isShow = opts.vm[value];
    const comment = document.createComment(["v-if"]);
    console.log("el------------:", isShow);
    if (!isShow) {
      el = comment;
      return;
    }
  }
  const newAttrs = vnode.attrs || {};
  for (let key in newAttrs) {
    if (key === "style") {
    } else if (key === "class") {
    } else if (key.substring(0, 1) == "@") {
      console.log("newAttrs[key]:", newAttrs[key]);

      el.addEventListener("click", newAttrs[key].bind(vnode.opts.vm), false);
    } else {
      el.setAttribute(key, newAttrs[key]);
    }
  }
}
//oldNode为真实节点，非虚拟dom
function patch(oldNode, vnode) {
  let el = createElement(vnode);
  console.log("oldNode==========>:", oldNode);
  // console.log("el==========>:", el;
  let parentNode = oldNode.parentNode;
  parentNode.insertBefore(el, oldNode.nextSibling);
  el.id = "app";
  parentNode.removeChild(oldNode);
}
export { patch };
