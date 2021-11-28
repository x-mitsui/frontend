window.onload = function (params) {
  init();
};
function init() {
  initCourseList();
}

function initCourseList() {
  var page = 0,
    cache = {};
  getAjaxCourse();
  function bindEvent() {
    var footer = document.getElementsByClassName("footer")[0];
    // console.log(footer);
    footer.addEventListener("click", function (e) {
      // console.log(e);

      var tar = e.target.parentNode;
      if (tar.className == "btn-item") {
        var children = footer.children;
        // console.log(children);
        for (let i = 0; i < children.length; i++) {
          // children[i].setAttribute("class", "btn-item");
          children[i].className = "btn-item";
        }
        page = Array.prototype.indexOf.call(children, tar);
        console.log(tar, children);
        cache[page] ? getCacheCourse() : getAjaxCourse();
        tar.className = "btn-item cur";
      }
    });
  }
  function getCacheCourse() {
    render(cache[page]);
  }
  function getAjaxCourse() {
    var oloading = document.getElementsByClassName("loading")[0];
    oloading.style.display = "block";
    ajaxReturn({
      url: APIs.getCourses,
      data: {
        page,
      },
      success: function (data) {
        console.log(data);
        cache[page] = data;
        t = setTimeout(function () {
          render(data);
          oloading.style.display = "none";
        }, 500);
      },
      error: function (params) {
        console.error("获取数据失败");
      },
    });
  }

  bindEvent();

  var tpl = document.getElementById("J_itemTpl").innerHTML;
  var ul = document.getElementsByClassName("js-list")[0];
  function render(data) {
    var list = "";
    for (let i = 0; i < data.length; i++) {
      const info = data[i];
      list += setTplToHTML(tpl, regTpl, {
        classname: info.classname,
        name: info.name,
        watched: info.watched,
        // folder: info.folder,
      });
    }
    ul.innerHTML = list;
  }
}
var APIs = {
  getCourses: "http://study.jsplusplus.com/Lfcourses/getCourses",
};
function ajaxReturn({ url, data, success, error }) {
  $.ajax({
    url,
    type: "GET",
    dataType: "JSON",
    data,
    timeout: 100000,
    success,
    error,
  });
}
