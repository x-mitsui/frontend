import picURL from "../imgs/6.jpg";
import picURL5 from "../imgs/5.jpg";

export default function (params) {
  console.log(picURL);
  const img = document.createElement("img");
  // const img = new Image();
  img.src = picURL;
  img.setAttribute("background", `url(${picURL5})`);
  console.log(img);
  console.log(document);
  document.body.appendChild(img);
}
