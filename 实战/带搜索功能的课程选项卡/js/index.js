var initTabEvents = (function (doc) {
  var data = JSON.parse(doc.getElementById("J_data").innerHTML),
    tpl = doc.getElementById("js-tpl").innerHTML,
    oCourseCardList = doc.getElementsByClassName("course-card-list")[0];
  return {
    selectIndex: "tab_all",
    curShowData: null,
    tabClick: function (e) {
      console.log("e:", e);
      console.log(this);

      var tar = e.target || e.srcElement;
      doc.getElementById(this.selectIndex).className = "course-tab-lk";
      this.selectIndex = tar.id;
      console.log(tar.id);
      tar.className = "course-tab-lk current";
      this.curShowData = this.filterData(tar.id);
      oCourseCardList.innerHTML = this.makeList();
    },
    filterData: function (key) {
      switch (key) {
        case "tab_free":
          return data.filter(function (value, index, arr) {
            return value.is_free == 1;
          });
        case "tab_super":
          return data.filter(function (value, index, arr) {
            return value.is_free != 1;
          });

        default:
          return data;
      }
    },
    makeList: function () {
      resovedData = this.curShowData;
      console.log("-", resovedData);
      var liststr = "";

      resovedData.forEach((elem) => {
        liststr += tpl.replace(/{{(.*?)}}/g, function (node, key) {
          return {
            img: elem.img,
            courseName: elem.course,
            is_free: elem.is_free,
            price: "￥" + elem.price,
            hours: elem.classes,
          }[key];
        });
      });
      return liststr;
    },
    ////////////查询//////////////
    searchCourse: function (e) {
      var tar = e.target || e.srcElement;
      console.log("input:", tar.value);
      var insertValue = tar.value;
      if (insertValue.length > 0) {
        this.curShowData = this.getSearchData(tar.value, this.curShowData);
      } else {
        this.curShowData = this.filterData(this.selectIndex);
      }
      oCourseCardList.innerHTML = this.makeList();
    },
    getSearchData: function (searchStr, searchData) {
      return searchData.reduce(function (pre, elem, index, arr) {
        if (elem.course.indexOf(searchStr) != -1) {
          pre.push(elem);
        }
        return pre;
      }, []);
    },
    /////
    init() {
      this.curShowData = data;
      oCourseCardList.innerHTML = this.makeList();
    },
  };
})(document);
(function (doc) {
  var oCourseTab = doc.getElementsByClassName("course-tab-list")[0],
    oCourseCardList = doc.getElementsByClassName("course-card-list")[0],
    oSearch = doc.getElementById("js-search-input");
  function init() {
    bindEvent();
    initTabEvents.init();
  }
  function bindEvent() {
    oCourseTab.addEventListener("click", initTabEvents.tabClick.bind(initTabEvents), false);
    oSearch.addEventListener("input", initTabEvents.searchCourse.bind(initTabEvents), false);
  }
  window.onload = function () {
    init();
  };
})(document);
