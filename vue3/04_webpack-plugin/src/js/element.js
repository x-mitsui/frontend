import "../css/image.css";
import "../font/iconfont.css";
const divEl = document.createElement("div");
divEl.className = "image-bg";

divEl.innerHTML = "你好 世界";
document.body.appendChild(divEl);

import imgM from "../imgs/4.jpeg";
const img = new Image();
// 利用webpack处理路径
img.src = imgM;
document.body.appendChild(img);

const iEl = document.createElement("i");
iEl.className = "iconfont icon-ashbin";
document.body.appendChild(iEl);
