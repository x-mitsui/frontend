//
import "../css/index.css";

//也可以import加载资源
import I3mage from "../imgs/3.jpeg";
function component() {
  const element = document.createElement("div");

  element.innerHTML = ["Hello", "Webpack"].join(" ");

  element.className = "content";

  const imgEl = new Image();
  imgEl.src = require("../imgs/3.jpeg").default;
  // imgEl.src = I3mage;//对应引入
  element.appendChild(imgEl);

  const bgDivEl = document.createElement("div");

  bgDivEl.style.width = 200 + "px";

  bgDivEl.style.height = 200 + "px";

  bgDivEl.className = "bg-image";

  bgDivEl.style.backgroundColor = "red";

  element.appendChild(bgDivEl);

  return element;
}
console.log(":::::", document);

document.body.appendChild(component());
