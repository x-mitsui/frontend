import picPath from "../imgs/5.jpg";
import "../css/index.css";
export default function () {
  const img = document.createElement("img");
  img.src = picPath;
  img.className += "logo";
  document.body.appendChild(img);
}
