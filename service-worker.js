/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2017-03-17/你好，世界/index.html","0b092b65e347b6ced1604f715fbe92ec"],["2017-10-20/ul li表格拖拽、吸附功能/index.html","943fbddb7062eac74580b7b20b8d38b5"],["2018-01-24/一维数组构建二位数组/index.html","fd90e33496d54ea4c7accf94c712723d"],["2018-03-26/css盒模型/index.html","4efdb673fb8c8acf1d246586e9fc8619"],["2018-03-26/页面布局/index.html","bbdf83410ace33500538c33f6d2eb8a2"],["2018-03-28/DOM事件/index.html","80bbb1b260e17746bdfc5b523b644217"],["2018-03-28/http协议/index.html","fc0939e5a2d1adf69c249d2cc89e0888"],["2018-03-28/针对集合的小方法/index.html","1a2da211b70b6a49b8e7801b0aa952d8"],["2018-03-30/vscode插件整理/index.html","3bee91e2fb81dda9d79b49c7aa95160c"],["2018-04-03/浅谈js原型/index.html","e3602b6fa7ef1a17df55ba110384643b"],["2018-04-08/用jq实现简单的数字动画/index.html","873283863c575202dc9be392f7cb1373"],["2018-04-09/用js实现简单的抛物线运动/index.html","544f948ba940a6c012be4710b095c411"],["2018-04-16/浅谈js运行机制/index.html","f4cce34126b83c252e046094d69f0433"],["2018-04-26/解析url字符串/index.html","14bd51a002ab13c005280cce69e2741a"],["2018-05-09/vscode的个人配置/index.html","9271abc14153aab7b78afcf697c9bbf7"],["2018-05-09/针对于移动端的兼容适配/index.html","5520903ba2ff769a99e350d0f1adf121"],["2018-06-14/用jq实现的单个span为单个的数字动画/index.html","e257018a4f13e43ad183bb6aafb15365"],["2018-06-15/webpack从什么都不懂到入门/index.html","517680b50bbbd1659ae5e482af266f4e"],["2018-08-22/webpack从单页面到多页面/index.html","99f19a10a325c47db35a4cfeef8560df"],["2018-10-24/awardRotate转盘插件文字模糊问题和图片加载问题/index.html","90f9bc88f8a7e9299d4102e163018faf"],["2018-11-01/GitBash主题风格/index.html","297b57ec847fd883a6b436ae8829c21d"],["2018-12-25/数组的方法的总结和使用/index.html","649482ddf7c3635ae3602ec2bca70c29"],["2019-01-09/字符串的方法的总结和使用/index.html","8d6c73f85c95e3ead8d932c07faac5d4"],["2019-11-16/使用ss代理简单爬取小说/index.html","88de27dbb4c8a5ab141a488c70e10cee"],["2019-12-30/docker-compose的mysql和mongo问题解决/index.html","2da6703d9aa2a73f1377f90534ac5392"],["2020-01-13/从零教你打造免费稳定高效的图床/index.html","5ed3de05128c307390e3540ca34b1cd3"],["2020-01-17/从零搭建Window前端开发环境/index.html","671c98e1eda126676114698e578d869d"],["2020-02-25/Windows10开启Ubuntu子系统并搭建Docker环境 - 副本/index.html","fb4ef87f8c54e5a7e9191096dd3dfa6d"],["2020-03-11/node实现图片分割/index.html","c732994d0741c770b34b5f2dae69600d"],["2020-03-14/用vue实现一个简单的时间屏幕/index.html","ad9bcc17fcbbefc1f1514f2ba76c53df"],["2020-06-04/Charles的基本使用/index.html","8719df09757f0d510beafcaa0de0407b"],["2020-06-08/手把手教你写一个符合自己需求的小程序日历组件/index.html","0e3384ebb389fcb472b0a2bf47001806"],["2020-06-10/node图片四周填充透明区域/index.html","bd5c29504915175f75697379770fd10b"],["2020-06-12/node实现图片尺寸批量修改/index.html","b82723a309f031bffd43ed697a800391"],["2020-06-17/node实现文件属性批量修改/index.html","f5afe16716908cce3ec38879b8f1ed9a"],["2020-07-05/node实现文件属性批量修改(文件名)/index.html","5be9ef52b79968960372aad1897309da"],["2020-09-08/JS中有趣的内置对象-JSON/index.html","5d146387eac41b926f89c17d53399b83"],["2020-11-03/Vue+Antd搭配百度地图实现搜索定位等功能/index.html","f9a4896fb31d92e7186684c3fe988f9a"],["2021-09-05/vue2+vite初体验/index.html","7a2971bb756bda3720fbffcadaeff33e"],["404.html","a5ef1306d3f46cc84b01aa0071893120"],["about/index.html","45eebb36f55d9d72e09cda51d7575c54"],["archives/2017/03/index.html","3654d9141b723633ff1111680f9042a9"],["archives/2017/10/index.html","f88b8e49084525cbfadb9587c1a13cc0"],["archives/2017/index.html","dc6773efba29a3d5ce297d9ba5b911df"],["archives/2018/01/index.html","958608d0b702870955490d5e982573de"],["archives/2018/03/index.html","7b40315cd3db529760f3ea7c41b56eee"],["archives/2018/04/index.html","06d035bcb74ed28d282d2aca36c3f78a"],["archives/2018/05/index.html","782a317ae6d0d7e2dea452e3ec034473"],["archives/2018/06/index.html","b1fa50a6781538db24e812ea6bcf9cb4"],["archives/2018/08/index.html","5a91de129b306d161d9decf7f965f745"],["archives/2018/10/index.html","64a0cc04a87caec445c77fb5aad62c70"],["archives/2018/11/index.html","a2ba486f15a02f263989a5aaa8165f77"],["archives/2018/12/index.html","f0c896bacc63efad16efbd5ae7b494ea"],["archives/2018/index.html","57866ee926b234f218e4df88066246c1"],["archives/2018/page/2/index.html","72012291ce6887577427526ebbbc188f"],["archives/2019/01/index.html","96eaf14fea3db02fdd1e19f0a36993d8"],["archives/2019/11/index.html","e2a23317ac3d61b37db9d9337be87e6b"],["archives/2019/12/index.html","605680338a8fe694552368bc12dc78db"],["archives/2019/index.html","f3ebe51f21313316efd8a504e11ad2ab"],["archives/2020/01/index.html","94eb51324a133d53544df4992b0e15ec"],["archives/2020/02/index.html","624f2f7814b4ea9695ba3a13ca376aee"],["archives/2020/03/index.html","c8b662a63139def0f9d828c90f50050c"],["archives/2020/06/index.html","3dcb3240f1a01a6e195d4a2d14978dba"],["archives/2020/07/index.html","def9152af0f16ffd73010c4735c7c8e3"],["archives/2020/09/index.html","b6a3bdc62dfc8a8ef1a2e3331cd2783c"],["archives/2020/11/index.html","4b302dad42b0949be048c2ff1f2b48a7"],["archives/2020/index.html","3d6836e02d6502d945e786776fbe4322"],["archives/2020/page/2/index.html","5c2991e665f5e6077a017b27b19a3d92"],["archives/2021/09/index.html","f46b9462f5c6db355e75c948ce2714ec"],["archives/2021/index.html","33f0a0c5b5dc94f0090d04ef8188340d"],["archives/index.html","a0314dc6adac6ac8d5d2c86aee7c438b"],["archives/page/2/index.html","f5cf9f8ad1e10d75c3b18cd7e91fe2af"],["archives/page/3/index.html","efe9853fea642d78647d872da20f0a7d"],["archives/page/4/index.html","a52859e7430b55184929a59d696de13b"],["assets/algolia/algoliasearch.js","d5d2500bfe8443b42baaefe4996ee532"],["assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["assets/algolia/algoliasearchLite.js","ce9b0e62645c036a143f639b92e7789f"],["assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["categories/index.html","cbc805c40ddd29e1fdd53aba6a582080"],["categories/小工具/index.html","0da4cbc907e6be3e84563a308f40accc"],["categories/小特效/index.html","51f35c527924876f1c68ba4122c73226"],["categories/小程序/index.html","a787ed043fb1d4e7db790d47f4654f03"],["categories/抓包工具/index.html","1de942cb33026c10878bba405b12f89f"],["categories/爬虫/index.html","88e897a59f6523df7924b5910f8c616e"],["categories/编辑器/index.html","f4b39dbb37beaa8703be03eacfccc25b"],["categories/记录/index.html","21ffc6a9d3ee9483d26b219177aebae4"],["categories/记录/page/2/index.html","dd46362a784331b63d8a0df0a1f26dd2"],["categories/记录/page/3/index.html","0a6d4f09e819a8852e98b7dce9e35fc7"],["categories/随笔/index.html","41fd136c42dc0017d0eec1a23cc27bce"],["css/index.css","12ad2eaa4ed764eeec2a4582eda8cc35"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["img/404.jpg","cae3eebf3121aedff311f6eea7e76a5e"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/alipay.jpg","931e2f2cfcf009ec2bba4dbd7e8d6f4f"],["img/avatar.png","c0aee6bd75608aa441bebc86a8061c78"],["img/comment_bg.png","34a79bf208a1c3bee9d6e491a00cd369"],["img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["img/post_loadding.svg","2901bcb74c0f032ed139676618432304"],["img/wechat.jpg","77ba5dee903310dd569c2c0d171f72b2"],["index.html","da65ab819dbb3690405f985411675ed6"],["js/main.js","654e74c44d97e167bb9eab33b12863c1"],["js/tw_cn.js","92e66bdd57e3153a3f979a8681310d49"],["js/utils.js","2011f2cb95cbb54971ef4a702fdc14c3"],["page/2/index.html","a7db695c1ef9ecd4fe37212bcdb7a922"],["page/3/index.html","2b7ce5b98e2b549fe4a3e1a471753c24"],["page/4/index.html","0eb0694ba91f7af12dc9d616c38eee6b"],["tags/Charles/index.html","d4169e102fb2911af794fdec7fdd9883"],["tags/Github/index.html","6d47f1d15cf9f07401a7e369a59f8123"],["tags/JsDelivr/index.html","6315c992a6bbb1518f2684ae0e208d96"],["tags/PicGo/index.html","e945b4465e3b06cbb0c796cf290b1521"],["tags/Shell/index.html","86accda387b65f74b5d6159826fb22ba"],["tags/ant-design-vue/index.html","7932cff0eac895b1432218a1196d3d0c"],["tags/baidu-map/index.html","a11d386f97541417e998ecb9c781b3ff"],["tags/css/index.html","f143436e7fb5c518ca59dc875f6c01e9"],["tags/html/index.html","f8d831ebe49e492711bbfae6745cb2b5"],["tags/http/index.html","4368924dc21e70567491640cb435d13c"],["tags/index.html","7e097e5e16482a9cc094f26fcd1ce052"],["tags/javascript/index.html","cdff53f163e5d51a656f593565240b17"],["tags/javascript/page/2/index.html","0c51b430270277cfda9020478bb4228b"],["tags/node-canvas/index.html","7d406d6d713db334e1650fcba301c361"],["tags/node/index.html","86e01f8bf9261eeae7bc2afe4457129f"],["tags/vite/index.html","b51184a09e6e9b900064118ec316726e"],["tags/vscode/index.html","75267068c29864422a089ed7224d3f4b"],["tags/vue/index.html","3f7886818fabe4012f2eae97d8a1caac"],["tags/webpack/index.html","10c688c3a089976a23ed82b5f008f5ff"],["tags/小程序/index.html","783040418db7cd1e00fa54f1248ec3f5"],["tags/随笔/index.html","fc95c971282b87e4558e037d13d43299"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







