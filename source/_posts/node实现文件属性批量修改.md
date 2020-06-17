---
layout: post
title: node实现文件属性批量修改(时间属性)
tags: node
category: 小工具
description: 在默认情况下，一个文件的创建时间和修改时间是系统自己设定的，我们不能修改该的。但我们有时为了某种特殊需要，为了不让别人一眼看出文件已经给修改了，我们又需要修改文件的创建时间和修改时间。那么如何修改文件夹时间，如何修改文件的创建时间，如何批量修改文件的创建时间、修改时间和访问时间呢？
date: 2020/06/17
---

# 前言

在默认情况下，一个文件的`创建时间`和`修改时间`是系统自己设定的，我们不能修改该的。但我们有时为了某种特殊需要，为了不让别人一眼看出文件已经给修改了，我们又需要修改文件的`创建时间`和`修改时间`。那么如何修改文件夹时间，如何修改文件的创建时间，如何批量修改文件的`创建时间`、`修改时间`和`访问时间`呢？别着急，接下来就带你自己修改他们。所以，闲话不多说啦，开始写我们的代码啦~~

> ps：小工具推荐[NewFileTime](https://wwa.lanzous.com/iNDjKdqzg9e)，以上简述摘抄于`NewFileTime`

# 简单的搭建一下

- 新建一个 `files` 目录

- 初始化一个`node`项目工程

  ```bash
  npm init -y
  ```

看到这里你会发现，其实我没有安装依赖，是因为原生的库有这个自带的功能吗？说是也行，说不是也行。原生的`utimes`目前支持修改文件的`修改时间`和`访问时间`，不支持修改文件的`创建时间`，所以我们需要借助一个第三方库来修改。

## 为什么不直接安装这个第三方库呢？

因为这个库有些许特殊，分两种情况，一个是低版本`Node`可以直接安装，在我本机的`Node13`上运行则会失败。具体原因嘛，可以看看下方的链接

> ps: [原因 + 解决方案](https://github.com/ronomon/utimes/pull/8)

所以，在低版本的`Node`我们可以直接`npm install @ronomon/utimes`，而在版本相对较高的则需要`npm i https://github.com/Jule-/utimes.git#napi-migration`啦

这里也提一嘴，如果`@ronomon/utimes`安装失败的话，是因为这些`原生Node`拓展是需要编译的，所以我们可能需要安装`windows-build-tools`，即以管理员身份启动`PowerShell`并运行：

```bash
npm install --global windows-build-tools
```

安装完依赖之后就可以正式写我们的代码啦，其实这个代码相对简单，就是直接调用它的`api`就好了。

# 简单的使用一下

- 新建一个`test-files`文件夹

- 在`test-files`文件夹新建`1.txt`文件供我们测试

  ![1.txt文件](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-17/utimes02.jpg)

- 编写如下代码：

  ```js
  // 导入 utimes
  const { utimes } = require("@ronomon/utimes");
  utimes(
    "./test-files/1.txt",
    // 创建时间
    +new Date("2010/01/01"),
    // 修改时间
    +new Date("2010/01/02"),
    // 访问时间
    +new Date("2010/01/03"),
    (err) => {
      //  修改成功的回调
      console.log(`success`);
    }
  );
  ```

- 运行代码，`node app.js`，是都发现日期发生了改变呢？

  ![1.txt文件](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-17/utimes02.jpg)

看到这里你以为是不是写完了，其实也差不多了 😝，不过我当然不会让你收获这么少的，至少我们可以看看我们这个最最最简单的例子的缺点，比如代码没有`Promise`化，那么我们就封装一下`utimes`

```js
/**
 *
 * @param {String} path => 路径
 * @param {Number} btime => 创建时间，不传即不修改
 * @param {Number} mtime => 修改时间，不传即不修改
 * @param {Number} atime => 访问时间，不传即不修改
 */
const utimesPromise = (path, btime, mtime, atime) => {
  return new Promise((resolve, reject) => {
    utimes(path, btime, mtime, atime, (err) => (err ? reject(err) : resolve()));
  });
};
```

当然- -，因为我们使用的是`Node`，所以我们不需要常规的用`new Promise`封装，可以直接使用内置的`util`这个工具中的`promisify`方法封装即可

> util.promisify 是在 node.js 8.x 版本中新增的一个工具，用于将老式的 `Error first callback` 转换为 `Promise` 对象，让老项目改造变得更为轻松。在官方推出这个工具之前，民间已经有很多类似的工具了，比如 `es6-promisify`、`thenify`、`bluebird.promisify`。以及很多其他优秀的工具，都是实现了这样的功能，帮助我们在处理老项目的时候，不必费神将各种代码使用 `Promise` 再重新实现一遍。

所以，我们的封装又变得更加简单了，代码如下：

```js
const { promisify } = require("util");
const utimesPromise = promisify(utimes);
```

之前的代码就可以改写成之前我们那样的自执行`Async Function`了，代码如下：

```js
// ...
(async () => {
  await utimesPromise(
    "./test-files/1.txt",
    // 创建事件
    +new Date("2010/01/01"),
    // 修改时间
    +new Date("2010/01/02"),
    // 访问时间
    +new Date("2010/01/03")
  );
})();
```

写到这里，你会发现其实我们根本没有做批量修改，是因为有了之前的经验，我们可以直接通过`glob`这个工具获取所有的路径，根本不要我们操心，写起来也十分简单，所以我打算最后再来写

- 安装`glob`

  ```bash
  npm i glob -S
  ```

- 多建几个文件用于测试我们的代码

  ![创建文件](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-17/utimes03.jpg)

  得出下面列表：

  ![创建文件](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-17/utimes04.jpg)

- 修改我们的代码：

  ```js
  const { utimes } = require("@ronomon/utimes");
  const glob = require("glob");
  const { promisify } = require("util");

  /**
   *
   * @param {String} path => 路径
   * @param {Number} btime => 创建时间，不传即不修改
   * @param {Number} mtime => 修改时间，不传即不修改
   * @param {Number} atime => 访问时间，不传即不修改
   */
  const utimesPromise = promisify(utimes);

  (async () => {
    const paths = glob.sync("./test-files/**");
    const len = paths.length;
    for (let i = 0; i < len; i++) {
      await utimesPromise(
        paths[i],
        +new Date("2010/01/01"),
        +new Date("2010/01/02"),
        +new Date("2010/01/04")
      );
    }
  })();
  ```

- 得出结果

  ![运行结果](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-17/utimes05.jpg)

这样子就递归了我们所有的文件夹跟子文件了进行修改了，本来想着在加载名字修改的，但苦于- -没有界面，篇幅也过长，就留着过几天再写了。

> [gitee 地址](https://gitee.com/gating/demo/tree/master/files),[github 地址](https://github.com/GATING/demo/tree/master/files)

# 最后

感谢各位观众老爷的观看 O(∩_∩)O 希望你能有所收获 😁
