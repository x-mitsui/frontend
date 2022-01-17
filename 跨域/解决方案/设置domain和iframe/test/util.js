// 封装
var createAjaxDomain = (function (doc) {
  function createIframe(frameUrl) {
    var iframe = doc.createElement("iframe");
    iframe.src = frameUrl;
    iframe.id = "myIframe";
    iframe.style.display = "none";

    return iframe;
  }

  return function (opt) {
    var iframe = createIframe(opt.frameUrl);
    iframe.onload = function () {
      var $$ = iframe.contentWindow.$; // 获取frame地址内的AJAX函数
      $$.ajax({
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: opt.success,
        error: opt.error,
      });
    };
    doc.appendChild(iframe);
  };
})(document);

createAjaxDomain({
  basicDomain: "jsplusplus.com",
  frameUrl: "http://127.0.0.1:8080/test/", // ’桥梁‘网址
  url: "http://127.0.0.1:8080/getTeachers", // 目标接口
  type: "POST",
  data: {
    status: 1,
  },
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.log("failed");
  },
});
