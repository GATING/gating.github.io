---
layout: post
title: Charles（青花瓷/花瓶）的基本使用
tags: Charles
category: 抓包工具
description: Charles 其实是一款代理服务器，通过成为电脑或者浏览器的代理，然后截取请求和请求结果达到分析抓包的目的。
date: 2020/06/04
---

# 前言

Charles 其实是一款代理服务器，通过成为电脑或者浏览器的代理，然后截取请求和请求结果达到分析抓包的目的。其次该软件是用 Java 写的，能够在 Windows，Mac，Linux 上使用。

## 什么是抓包？

抓包（packet capture）就是将网络传输发送与接收的数据包进行截获、重发、编辑、转存等操作，也用来检查网络安全。抓包也经常被用来进行数据截取等。

# Charles 主要功能

- 支持 SSL 代理。可以截取分析 SSL 的请求。
- 支持流量控制。可以模拟慢速网络以及等待时间（latency）较长的请求。
- 支持重发网络请求，方便后端调试。
- 支持修改网络请求参数。
- 支持网络请求的截获并动态修改。

> PS：Charles 是收费软件，可以免费试用 30 天。试用期过后，未付费的用户仍然可以继续使用，但是每次使用时间不能超过 30 分钟，并且启动时将会有 10 秒种的延时。

# 开始抓包

默认，他会把电脑设置为代理，这样你会发现，你通过浏览器请求到网址都会出现在这里。
通常点击某一个网址后，你会发现右边会出现这个网址请求的大概信息，点击具体的请求后会出现 request 和 response 等信息
但是你会发现 `https` 都是 `unknown` ，这时候就需要我们安装证书啦。

## 安装 ssl ca 证书

- 配置 Charles 证书；选择 help —> SSL Proxying -> install Charles Root Certificate，就会出现如下界面

![安装 ssl ca 证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles01.png)

- 点击安装证书再点击，安装在“受信任的根证书颁发机构” ，这一步十分重要，如不在这个目录下，则不能抓取 https 请求

![安装 ssl ca 证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles02.png)

![安装 ssl ca 证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles03.png)

之后无脑下一步就安装完成啦

## 配置 SSL Proxy Settings

添加上证书后，会发现还是不能抓取 `https` 请求，这是因为我们还没有配置 `ssl` 的代理，接下来我们配置一下
在 Proxy -> SSL Proxy Settings，然后选择 Enable SSL Proxying，在点击 Add

![配置 SSL Proxy Settings](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles04.png)

> ps: 通常 https 默认端口就是 443，所以这里我们通过匹配符 \*:443 就可以抓取大部分的 https 请求了

### 打开百度

搜索一下 12306 就会出现百度根据 12306 查询关联的下拉列表请求了

![打开百度](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles05.png)

到这里，基本的 `https` 抓包就可以使用了
接下来，我们连接真机进行真机的抓包体验。。。

## 手机安装证书

**首先，手机和电脑需要在同一个局域网才可以进行抓包**

![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles06.png)

![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles07.png)

这里会告诉我们，用手机浏览器打开 [chls.pro/ssl](http://chls.pro/ssl) 就可以安装证书了
先手动配置下代理，打开 `WIFI`，设置，代理填写刚刚的 ip 地址，具体如图：

![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles08.jpg)

打开后会出现是否允许设备连接 `Charles`，点击 `allow` 即可
![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles09.png)

手机端访问 [chls.pro/ssl](http://chls.pro/ssl),下载证书就可以安装了

这里还是以百度为例，手机访问百度之后再次搜索 `12306`, 同样会出现下面的下拉列表：

![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles10.jpg)

`Charles` 就会截取我们请求这个地址的数据，如图所示：

![手机安装证书](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles11.png)

这样子就实现了我们的真机抓包啦。

### 安卓端

> ps: 可能是因为我这里之前装过证书了，所以可以抓包成功，实际上安卓 7.0 以上因为一些安全政策，不允许将证书安装到信任目录，想实现抓包则需要将下载的证书复制到/system/etc/security/cacerts/目录

解决条件：手机需要 root

参考链接：[Android9.0 配置 charles 的 https 抓包](https://www.cnblogs.com/ilizhu/p/11175431.html),[android 9.0 以上 charles https 抓包](https://www.cnblogs.com/wangyuehome/p/11203771.html)

> ps: openssl 直接在 gitbash 就可以使用了，所以上面的操作直接在 gitbash 即可

### ios 端

ios 配置比安卓简单了许多，安装完后只需要在 wifi 中设置代理，在之后 打开设置 -> 关于本机 -> 证书信任设置，打开完全信任开关。就可以抓包了。

> ps：因为手机抓包，截图不方便，所以下面用 pc 来讲解其他内容，实际使用是一样的

# Throttle Setting 模拟网速

有时候在开发的时候我们想要模拟一下网络慢的情况，这时候 Charles 他是可以帮助到你的，在 Proxy -> Throttle Setting，然后选择 Enable Throttling，在 Throttle Preset 下选择网络类型即可，具体设置你可以自行拿捏。

![Throttle Setting 模拟网速](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles12.png)

# Breakpoints 断点

在 `Charles` 发起一个请求的时候，我们是可以给某个请求打一个断点的，然后来观察或者修改请求或者返回的内容，但是在这过程中要注意请求的超时时间问题。要针对某一个请求设置断点，只需要在这个请求网址右击选择 Breakpoints 就可以断点某一个请求了。

这里我们以简书的右侧推荐作者为例，

![Breakpoints 断点](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles13.png)

右键，打上断点，刷新一下

![Breakpoints 断点](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles14.png)

通过右侧的 Edit Request 就可以修改我们的请求参数啦

![Breakpoints 断点](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles15.png)

比如，我们把 `count` 修改为 2，则页面返回的数据只有两条了

# Rewrite Settings 内容替换

有时候我们会测一下请求的参数不同会带来不同的返回结果以测试是否达到业务需求，或者需要不同的返回结果来验证我们对数据的处理是否正确，这时候需要后台的同事配合，但是有了 `Charles`，我们可以自己把控接口返回来的内容，比如数据的空与否，数据的长短等等。

> 再或者，修改别人的 app 里面接口的返回值，供做一些自己想做的事 😏

击 Tools -> Rewrite Settings , 就可以使用我们的内容替换了，同样是以全部渠道这个接口为例
点击 enable，启用该功能（事先复制好接口链接），点击 Add 添加一个重写配置，这里命名为 `Test`

![Rewrite Settings 内容替换](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles16.png)

点击右下 add 按钮，选中 body ，设置要修改的字符，修改即可

![Rewrite Settings 内容替换](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles17.png)

这里有个小问题，因为我们修改的是中文，所以我们需要在返回的数据 Header 中 Content-Type 字段声明 charset=UTF-8。即：

![Rewrite Settings 内容替换](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles18.png)

修改完成后，我们看下界面的变化，是不是所有 `乔汉童` 都变成了 `磨蹭先生` 啊

![Rewrite Settings 内容替换](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles19.png)

# Map Remote 请求重定向

求重定向的作用是什么呢？开发中一般都是测试环境，如果我们想对比一下和线上版本的区别的话，可以讲测试的请求重定向到正式环境下。在选择 Tools -> Map Remote 下：

> ps: 其实这个和重写作用类似，但是比重写适用性更广，而且更可控

和 Rewrite 操作类似，我们同样需要点击 enable ，之后输入我们需要重定向的地址

![Map Remote 请求重定向](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles20.png)

映射数据如下：

```json
{
  "users": [
    {
      "id": 5796592,
      "slug": "86b81ed8e35c",
      "nickname": "磨蹭先生",
      "avatar_source": "https://cdn.jsdelivr.net/gh/GATING/blog_imgs@master/blog/avatar.png",
      "total_likes_count": 200044,
      "total_wordage": 36871100,
      "is_following_user": false
    }
  ],
  "total_count": 41931
}
```

这里主要修改了第一个数据，我们看看效果

![Map Remote 请求重定向](https://cdn.JsDelivr.net/gh/GATING/blog_imgs/2020-06-04/charles21.png)

发现，数据的确发生了改变，也实现了我们的目的

# 最后

感谢各位观众老爷的观看啦，Charles 还有一些其他的妙用。就等着各位慢慢的去发掘吧！
