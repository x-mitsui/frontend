/**
 * 
 *  <div>
    	<div>
      	<img v-if='isShowImg1' src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
        <img v-show='isShowImg2' src='https://www.baidu.com/img/flexible/logo/pc/result.png'/>
      </div>

      <button @click='changeShowImg1'>显示图片1</button>
      <button @click='changeShowImg2'>显示图片2</button>
    </div>
 */
/**
 *
 * _c=>createElement()
 * _v=>createTextNode();
 * _f=>genIf();
 * _s=>genShow()
 * @param {*} ast
 */

function formatAttrs(attrs) {
  let attrString = "";

  attrs.forEach(function (attr) {
    // if (attr.name === "style") {
    // }

    attrString += `"${attr.name}":${JSON.stringify(attr.value)},`;
  });
  console.log("attrString:", attrString);
  return `${attrString.slice(0, -1)}`;
}

function generateChild(childNode) {
  if (childNode.type === 1) {
    return generate(childNode);
  } else if (childNode.type === 3) {
    let text = childNode.text;

    // 处理插值 此处不考虑，因为没有使用插值

    const defaultTagRE = /\{\{((?:.|\r?n)+?)\}\}/g;

    if (!defaultTagRE.test(text)) {
      console.log("text:", text);
      return `_v(${JSON.stringify(text)})`;
    }
    let match,
      textArr = [],
      index,
      lastIndex = (defaultTagRE.lastIndex = 0); //注意置位
    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.substring(lastIndex, index)));
      }
      textArr.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.substring(lastIndex)));
    }
    return `_v${textArr.join("+")}`;
  }
}
function getChildren(ast) {
  const children = ast.children;
  if (children) {
    let m = children.map((c) => generateChild(c)).join(",");
    if (Object.prototype.toString.call(m) == "[object Object]") {
      console.log("m------->:", m);
    }
    console.log("m:", m);
    return m;
  }
}
// function formatDirectives(directives) {
//   console.log("opts");
//   if (Object.keys(directives).length > 0) {
//     const { methods } = opts;
//     console.log("methods:", methods);
//     Object.keys(directives).forEach((key) => {

//       directives[key] = methods[key];
//     });
//   }
//   console.log("huhung", directives);
//   return directives;
// }
function generate(el) {
  /** 
  _c(
    "div",
    {},
    _c(
      "div",
      {},
      isShowImg1()
        ? _c("img", { src: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" })
        : "<!-- v-if -->",

      _c("img", {
        src: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
        style: isShowImg2() ? { display: "block" } : { display: "none" },
      })
    ),
    _c("button", { click: changeShowImg1() }, _v("显示图片1")),
    _c("button", { click: changeShowImg1() }, _v("显示图片2"))
  );
  */

  let children = getChildren(el);
  console.log("directives:", el.directives);
  let codeString = `_c(
    '${el.tag}',
    ${el.attrs.length > 0 ? `${JSON.stringify(el.attrs)}` : "undefined"},
    ${Object.keys(el.directives).length > 0 ? `${JSON.stringify(el.directives)}` : `[]`},
    ${children ? `${children}` : `[]`}
  )`;
  // console.log("codeString:", codeString);
  return codeString;
}
export { generate };
