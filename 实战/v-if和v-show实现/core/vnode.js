function _c(tag, attrs, direactives, ...children) {
  if (children) console.log("_c:", direactives);

  return createNodeElement(tag, attrs, direactives, children);
}

function _v(params) {
  return vnode(undefined, undefined, undefined, params);
}

function createNodeElement(tag, attrs, direactives, children) {
  // console.log("attrs:", attrs);
  // console.log("children:", children);

  let attrObj = {};
  if (attrs) {
    console.log("attrs>>>:", attrs);
    attrs.forEach((attr) => {
      attrObj[attr.name] = attr.value;
    });
  }

  return { tag, attrs: attrObj, children, undefined, direactives };
}
function vnode(tag, attrs, children, text, direactives) {
  return {
    tag,
    attrs,
    children,
    text,
    direactives,
  };
}
export { _c, _v };

// _c(
//   "div",
//   undefined,
//   [],
//   _c(
//     "div",
//     undefined,
//     [],
//     _c(
//       "img",
//       [
//         {
//           name: "src",
//           value: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
//         },
//       ],
//       [],
//       []
//     ),
//     _c(
//       "img",
//       [{ name: "src", value: "https://www.baidu.com/img/flexible/logo/pc/result.png" }],
//       [],
//       []
//     )
//   ),
//   _c("button", [{ name: "@click", value: "changeShowImg1" }], [], _v("显示图片1")),
//   _c("button", [{ name: "@click", value: "changeShowImg2" }], [], _v("显示图片2"))
// );
