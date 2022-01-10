let html = "",
  stack = [],
  root,
  currentParent;
function parseTemplateToAst(template) {
  stack = [];
  root = null;
  currentParent = null;
  html = template;

  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startNode = parseStartTag();
      if (startNode) {
        handleStartTag(startNode.tagName, startNode.attrs, startNode.unarySlash);
        continue;
      }

      const endTagMatch = parseEndTag();
      if (endTagMatch) {
        handleEndTag(endTagMatch[1]);
        continue;
      }
    }
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      handleChars(text);
    }
    if (html.match(/^\s*$/)) {
      // 如果最后就剩下空格就退出循环
      break;
    }
  }
  return root;
}

function parseStartTag() {
  const startTag = /^\s*<([a-zA-Z_][\w]*)/; //开始标签的起始部分
  // 一定要从起始开始判断
  const attrTag = /^\s*(\S*\=(('|")(.*?)\3)+?)/; //开始标签的属性
  // 结束标志，有可能是单闭合标签
  const startTagClose = /^\s*(\/?)>/; //开始标签的技术部分

  let matchArr = html.match(startTag);
  if (!matchArr) return;
  // console.log(matchArr);
  const node = {
    tagName: matchArr[1],
    attrs: [],
  };
  // stack.push(matchArr[1]);

  advance(matchArr[0].length);
  // console.log("html:", html);

  // 匹配到属性的情况下，matchArr就不为null
  let endMatchArr = html.match(startTagClose);
  while (!(endMatchArr = html.match(startTagClose)) && (matchArr = html.match(attrTag))) {
    let [key, value] = matchArr[1].split("=");
    // console.log("matchArr:", matchArr);
    // console.log("打印属性键值对", key, value);
    node.attrs.push({ name: key.trim(), value: matchArr[4].trim() });

    advance(matchArr[0].length);
  }
  if (endMatchArr) {
    node["unarySlash"] = endMatchArr[1];

    advance(endMatchArr[0].length);
    return node;
  }

  console.log("html:", html);
  console.log("node:", node);
}

function parseEndTag() {
  const endTag = /^\s*<\/([a-zA-Z_][\w]*)>/;
  let matchArr = html.match(endTag);
  if (matchArr) {
    advance(matchArr[0].length);
  }
  return matchArr;
}

function handleStartTag(tagName, attrs, unarySlash) {
  // console.log("--------开始--------");
  // console.log("tagName:", tagName);
  // console.log("attrs:", attrs);

  // 这里简单处理一下指令
  const directives = {};
  // 注意：这里使用filter而不是foreach的原因，因为foreach会因为splice删除而导致数组下标混乱
  // 另外：filter并不影响原数组
  attrs = attrs.filter((attr, index) => {
    if (attr["name"] == "v-if") {
      directives["if"] = attr["value"];
      return false;
    }
    if (attr["name"] == "v-show") {
      directives["show"] = attr["value"];
      return false;
    }
    return true;
  });
  const element = createASTElement(tagName, attrs, directives);
  if (unarySlash == "/") {
    element.parent = currentParent;
    currentParent.children.push(element);
    return;
  }
  if (!root) {
    root = element;
  }

  currentParent = element;
  stack.push(element);
}

function handleChars(text) {
  // console.log("--------文本-------");
  // console.log("text:", text);
  text = text.trim();
  if (text.length > 0) {
    currentParent.children.push({
      type: 3,
      text,
    });
  }
}

function handleEndTag(tagName) {
  // console.log("--------结束-------");
  // console.log("tagName:", tagName);
  const element = stack.pop();
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    console.log("currentParent:", currentParent);
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}

function createASTElement(tagName, attrs, directives) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    attrs,
    parent,
    directives,
  };
}
function advance(n) {
  html = html.substring(n);
}
export { parseTemplateToAst };
