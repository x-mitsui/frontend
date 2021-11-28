function setTplToHTML(tpl, regExp, opt) {
  return tpl.replace(regExp(), function (node, key) {
    return opt[key];
  });
}

function regTpl() {
  return new RegExp(/{{(.*?)}}/, "gim");
}
