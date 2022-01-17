# 本工程目的

通过 iframe+window.name 实现跨域访问。

# 文件夹结构

1. server1 下含目标接口测试服务器和 iframe 初始页面
2. server2 下 html 文件为访问目标接口的页面 html1，和重定向页面 html2。

# 为何能实现

1. 父页面和子页面同源才可通信，这里子页面指通过 iframe src 引入的页面。
2. 父页面可以访问同源子页面的 window.name
3. iframe 页面切换前后，window.name 不变。
4. 每次 iframe 页面加载都会触发 onload 事件

# 如何测试

1. cd 到 server1 和 server2 文件夹，分别执行 yarn install
   然后分别执行 yarn dev

2. 访问 http://127.0.0.1:8082/test1 (server2 下 html 文件)

3. 打开控制台，观察输出。

   `建议将控制台Network下Disabled cache勾选，便于测试`
