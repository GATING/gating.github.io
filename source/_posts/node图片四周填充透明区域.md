---
layout: post
title: node实现图片四周填充透明区域
tags: node
category: 记录
description: 不知道你们有没有遇到这样的情况，写小程序的时候，文档里面推荐的 tabbar 图标是 81 * 81，但是实际效果图片又偏大，而且配置项也没有可调节的配置。那么怎么样解决这个问题呢？一般都是找 UI 小姐姐把 icon 四边添加透明填充来调整 icon 大小的。
date: 2020/06/10
---

# 前言

不知道你们有没有遇到这样的情况，写小程序的时候，文档里面推荐的 tabbar 图标是 `81 * 81`，但是实际效果图片又偏大，而且配置项也没有可调节的配置。那么怎么样解决这个问题呢？一般都是找 UI 小姐姐把 icon 四边添加透明填充来调整 icon 大小的。

但是如果没有 ui 小姐姐的情况下，我们要如何解决呢？虽然可以通过`ps`的批处理解决，但毕竟我们是`程序猿`，当然是通过代码来解决这种小问题啦。所以，闲话不多说啦，开始写我们的代码啦

# 简单搭建一下

- 新建一个 `canvas-blank-area` 目录

- 初始化一个`node`项目工程

  ```bash
  npm init -y
  ```

- 安装依赖，这里主要用到了三个依赖，分别是`处理图片`、`获取图片大小`、`压缩成zip文件`

  ```bash
  npm i canvas image-size archiver -S
  ```

是不是很眼熟，这依赖和我之前的那篇[node 实现图片分割](https://gatings.cn/2020-03-11/node%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E5%88%86%E5%89%B2/)博客一模一样吗？没错，就是一摸一样，我们再次通过 `canvas`这个库来处理我们的小需求。

> 不得不说这个`canvas`库真的是挺好用的。

# 简单的使用一下

有了上一篇我们使用`canvas`的经验，其实书写代码对于我们来说应该是不难了，我们看看我实现的效果：

![node图片四周填充透明区域](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-10/blank-area.png)

看到这里，是不是想跃跃欲试啦，所以，我们尝试写一下我们的代码

```js
// 创建写入流
const { createWriteStream } = require("fs");
// 获取文件名
const { basename } = require("path");
// 压缩文件
const archiver = require("archiver");
// 导入canvas库，用于裁剪图片
const { createCanvas, loadImage } = require("canvas");
// 获取图片大小
const sizeOf = require("image-size");
// 批量获取路径
const glob = require("glob");
!(async () => {
  const paths = glob.sync("./images/*");
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  // 输出到当前文件夹下的 blank-area.zip
  const output = createWriteStream(__dirname + "/blank-area.zip");
  archive.pipe(output);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const image = await loadImage(path);
    const { width, height } = await sizeOf(path);
    const canvas = createCanvas(81, 81);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, (81 - width) / 2, (81 - height) / 2);
    archive.append(canvas.toBuffer(), { name: `${basename(path)}` });
  }
  archive.finalize();
})();
```

这么一看，是不是比我们之前那个分割图片的代码简单多了，我相信小伙伴们肯定早就自己写出来啦~~😊

最后，跑一下我们写的程序，当前目录就会多出了一个 `blank-area.zip` 的压缩包，解压出来就是我们需要的图片啦 😊

> [gitee 地址](https://gitee.com/gating/demo/tree/master/canvas-blank-area),[github 地址](https://github.com/GATING/demo/tree/master/canvas-blank-area)

# 最后

感谢各位观众老爷的观看 O(∩_∩)O
