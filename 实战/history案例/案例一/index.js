const lis = Array.from(document.getElementsByClassName("box"));

function selectBox(id) {
  lis.forEach((item) => {
    item.classList.toggle("active", id === item.id);
  });
}
lis.forEach((liEl) => {
  liEl.addEventListener("click", function (el) {
    const elID = el.target.id;
    console.log(elID);
    console.log(el.target.classList);
    if ([].some.call(el.target.classList, (item) => item === "active")) {
      console.log("已经存在active类");

      return;
    }
    selectBox(elID);
    history.pushState({ elID }, null, elID);
  });
});
window.addEventListener("popstate", function (el) {
  // 非首页
  if (el.state.elID) {
    console.log("popstate event:" + el.state.elID);
    selectBox(el.state.elID);
  }
});
