---
layout: post
title: JS中有趣的内置对象-JSON
tags: javascript
category: 记录
description: 在以前的web开发中，我们多数选择纯文本或XML作为我们的提交的数据格式，大多数是XML，少数纯文本。其实从AJAX(Asynchronous JavaScript and XML)的命名我们也知道，数据交换是大多数通过XML格式进行的。
date: 2020/09/08
---

# 前言

在以前的`web开发中`，我们多数选择`纯文本`或`XML`作为我们的提交的数据格式，大多数是`XML`，少数`纯文本`。其实从`AJAX(Asynchronous JavaScript and XML)`的命名我们也知道，数据交换是大多数通过`XML`格式进行的。但是`XML`格式有一个缺点，就是文档构造复杂，需要传输比较多的字节数，并且解析起来也比较麻烦。所以就创建了`JSON`这种数据描述格式，可以很简单的就描述很复杂的数据。同时独立于语言，这样就可以在多种语言内使用。也正是因为这个，`JSON`的轻便性逐渐得到重视，后来替代`XML`成为最主要的数据传输格式。

> ps: 当然，虽然说了很多`JSON`的好处，你就以为不用学习`XML`了吗？肯定不是啦，微信公共平台接口中的有是有相当一部分接口使用了`XML`的。

`JSON`对象包含两个方法: 用于解析 [JavaScript Object Notation](https://www.json.org/json-en.html) ([JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)) 的 parse() 方法，以及将对象/值转换为 JSON 字符串的 stringify() 方法。除了这两个方法, JSON 这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

> ps: [JSON：并不是 JavaScript 的子集。](http://timelessrepo.com/json-isnt-a-javascript-subset)尽管不是严格意义上的子集，JSON 非常接近 JavaScript 语法的子集。

# JavaScript 与 JSON 的区别

| JavaScript类型 | JSON 的不同点                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 对象和数组     | 属性名称必须是双引号括起来的字符串；最后一个属性后不能有逗号。                                                                          |
| 数值           | 禁止出现前导零（JSON.stringify 方法自动忽略前导零，而在 JSON.parse 方法中将会抛出 SyntaxError）；如果有小数点, 则后面至少跟着一位数字。 |


针对于这两点，我们举个例子，对于对象和数组类型：

```js
// 属性名称必须是双引号括起来的字符串
const test1 = "['1','1']"
JSON.parse(test1) // Uncaught SyntaxError: Unexpected token ' in JSON at position 1

const test2 = "{'name':'gating'}"
JSON.parse(test2) // Uncaught SyntaxError: Unexpected token o in JSON at position 1

const test3 = '["2","1"]'
JSON.parse(test3) // ["2","1"]

const test4 = '{"name":"gating"}'
JSON.parse(test3) // {name: "gating"}

// 最后一个属性后不能有逗号
const test5 = '["2","1",]'
JSON.parse(test5) // Uncaught SyntaxError: Unexpected token ] in JSON at position 9
const test6 = '{"name":"gating",}'
JSON.parse(test6) // Uncaught SyntaxError: Unexpected token } in JSON at position 17
```

对于数值类型：
```js
// 禁止出现前导零
const test7 = [00010, 1]
JSON.stringify(test7) // "[8,1]"

const test8 = "[00010, 1]"
JSON.parse(test8) // SyntaxError: Unexpected number in JSON at position 2**

// 如果有小数点，则后面至少跟着一位数字。
const test9 = [1, 1.]
JSON.stringify(test9) // "[1,1]"

const test10 = "[1, 1.]"
JSON.parse(test10) // Uncaught SyntaxError: Unexpected token ] in JSON at position 6
```

> ps: **0+数字**表示8进制，- -所以上面打印出来的是8，同样的有：**0b+数字(二进制)**、**0x+数字(16进制)**，其实**0o+数字**也可以表示8进制


其实还有一个字符串类型，**JavaScript**和**JSON**处理是不一致的，这里为啥我只写两点呢？是因为还有现在在新版的**Chrome**已经可以解析正常，但是想具体可以查看下面[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)自行了解，这里就不展开了

> 参考：[JavaScript 与 JSON 的区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)，字符串那一点我在**Chrome 85.0.4183.83**以及可以正常解析

# stringify

stringify() 方法用于将`JavaScript`值转换为`JSON`字符串。

虽然我们经常用这个方法，但我想估计有不少人不知道它居然有三个参数之多吧？分别是`value`、`replacer`、`space`。

> JSON.stringify(value[, replacer [, space]])

- value
  - 将要序列化成 一个 JSON 字符串的值。
- replacer `可选`
  - 如果该参数是一个**函数**，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个**数组**，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 **null** 或者未提供，则对象所有的属性都会被序列化。
- space `可选`
  - 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。


## value参数

通常我们最常用的就是第一个参数，也就是value参数，但是你知道它的运算规则是怎么样的吗？闲话不多说，直接上例子

### NaN 和 Infinity 格式的数值及 null 都会被当做 null

```js
JSON.stringify([NaN, Infinity, null]) // [null,null,null]
```

### undefined、任意的函数以及 symbol 值的处理

#### 出现在非数组对象的属性值中时，在序列化过程中会被忽略

```js
JSON.stringify({x: undefined, y: Object, z: Symbol("")}) // "{}"
```

#### 出现在数组中时被转换成null

```js
JSON.stringify([undefined, Object, Symbol("")])  // "[null,null,null]"
```

#### 单独出现则会返回undefined

```js
JSON.stringify(undefined)  // undefined
JSON.stringify(Object)  // undefined
JSON.stringify(Symbol(""))  // undefined
```

### 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

```js
JSON.stringify({[Symbol("foo")]: "foo"}) // "{}"
JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]) // "{}"
```


### 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。

```js
JSON.stringify({
  toJSON: function() {
    return 'gating'
  }
}) // "gating"

const name = {
  age: 18,
  toJSON: function () {
    return 'gating'
  },
}
JSON.stringify({ name }) // {"name":"gating"}
```


又因为**Date**对象上挂载了一个**toJSON**方法，所以针对于**Date**类型，它默认就会调用**Date**类型上的**toJSON**方法(同Date.toISOString())

```js
JSON.stringify(new Date("2020/01/01")) // "2019-12-31T16:00:00.000Z" 因为中国在东八区，所以相差了8小时
```

> ps: 东八区（UTC/GMT+08:00）是比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区


### 其他类型的对象，仅会序列化对象可枚举的属性，包括 Map/Set/WeakMap/WeakSet

```js
JSON.stringify(
  Object.create(null, {
    x: { value: 'x'}, // enumerable 默认为不可枚举
    y: { value: 'y', enumerable: true },
  })
) // "{"y":"y"}"

const map = new Map()
Object.defineProperty(map, 'name', {
  value: 'gating',
  enumerable: true
})
Object.defineProperty(map, 'age', {
  value: 18
})
JSON.stringify(map) // {"name":"gating"}
JSON.stringify(new Set) // {}
JSON.stringify(new RegExp) // {}
```

看到这里，你基本已经知道运算规则是怎么样滴了，也就知道了为什么`JSON.stringify + JSON.parse`不能转换函数、正则、Error等对象了吧？

那么接下来就要了解下更有意思的东西啦，就是`stringify`第二个参数`replacer`啦

## replacer参数

replacer 参数可以用来来更改默认的字符串化的行为。它可以是一个函数或者一个数组。如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

### 作为函数

在开始时, replacer 函数会被传入一个空字符串作为 key 值，代表着要被 stringify 的这个对象。随后每个对象或数组上的属性会被依次传入。

这句话看不太懂？不要紧，举个例子你就懂了

```js
function replacer(key, value) {
  console.log('[' + key + ']:' + value)
  return value
}

JSON.stringify({ name: 'gating', age: 18 }, replacer)
// []:[object Object]
// [name]:gating
// [age]:18
```

上面例子中，他会执行三次，也就是一开始他会默认传一个空字符串作为键，而键值是整个对象；第二次键为`name`，键值为`gating`，以此类推。


当然，这里也有个特别需要注意的点，就是返回的是一个对象的时候，该对象递归地序列化成 JSON 字符串，对每个属性调用`replacer`方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。

比如：

```js
function replacer(key, value) {
  return {a:1}
}
JSON.stringify({}, replacer)
```

因为我们每次返回的都是对象，那么每次都会调用`replacer`，所以会造成堆栈溢出，那么我们举个不会溢出的小栗子例子吧🤣：

```js
function replacer(key, value) {
  if(typeof value === 'object'){
    return { age: 9 }
  }
  return value * 2
}
const name = {}
JSON.stringify(name, replacer) // {"age":18}
```

在这里，每一次处理的对象，都是前一次返回的值。因为我们`replacer`修改了`name`对象，接着就要递归`replacer`处理修改后的对象。

> 总结：递归处理中，每一次处理的对象，都是前一次返回的值。

```js
function f(key, value){
  console.log(value)
  if (typeof value === "object"){
    return {b: 2};
  }
  return value*2;
}

JSON.stringify(o,f)
```


那么，既然是更改默认的字符串化的行为，那么我就尝试下更改下吧

#### replacer——数字Double

```js
function replacer(key, value) {
  if (typeof value === "number") {
    return value * 2;
  }
  return value;
}
const me = {
  name: 'gating',
  age: 9,
}
JSON.stringify(me, replacer) // {"name":"gating","age":18}
```

#### replacer——剔除不要的属性

```js
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}
const me = {
  name: 'gating',
  age: 18,
}
JSON.stringify(me, replacer) // {"age":18} 剔除了name属性
JSON.stringify([1,"2"], replacer) // "[1,null]"
```

> 注意: 不能用 replacer 方法，从数组中移除值（values），如若返回 undefined 或者一个函数，将会被 null 取代(其实从 value 的运算规则我们也知道会出现这个结果了)。

### 作为数组

数组的值代表将被序列化成`JSON`字符串的属性名

```js
const me = {
  name: 'gating',
  age: 18,
}
JSON.stringify(me, ['name']) // {"name":"gating"} 只保留了name的属性值
JSON.stringify(['a', 'b'], ['0']) // ['a', 'b']
```
> 这个类似白名单的数组，只对对象的属性有效，对数组无效。

## space参数

space 参数用来控制结果字符串里面的间距，增加返回的 JSON 字符串的可读性。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）。

### 使用数字

```js
JSON.stringify({ name: "gating", age: 18 }, null, 6)
/*
"{
      "name": "gating",
      "age": 18
}"
*/
```

### 使用字符串

```js
JSON.stringify({ name: "gating", age: 18 }, null, '|-')
/*
"{
|-"name": "gating",
|-"age": 18
}"
*/
```

### 使用制表符（\t）来缩进

因为最用用到要美化JSON的场景，所以顺便把制表符也写出来了 😊

就是提交的时候是json，返回的时候美化json显示到输入框内

```js
JSON.stringify({ name: "gating", age: 18 }, null, '\t')
/*
"{
	"name": "gating",
	"age": 18
}"
*/
```

## 总结

- JSON.stringify()将值转换为相应的JSON格式：
  - 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
  - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
  - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
  - undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
  - 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
  - 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
  - Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
  - NaN 和 Infinity 格式的数值及 null 都会被当做 null。
  - 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。


# parse

parse() 方法用于将一个 JSON 字符串转换为对象。

> JSON.parse(text[, reviver])

## text参数

text参数没啥可说的，就是要被解析成 JavaScript 值的字符串，必须符合[JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)的语法格式

```js
JSON.parse('{}') // {}
// 如果传入的字符串不是有效的 JSON 格式, JSON.parse方法将报错。
JSON.parse("'String'") // Uncaught SyntaxError: Unexpected token ' in JSON at position 0
```

## reviver参数

reviver参数和JSON.stringify方法的reviver参数类似，唯一不同的是如果有深层对象，他的遍历顺序依照：

从最内层开始，按照层级顺序，依次向外遍历，而JSON.stringify的遍历顺序刚好相反，从外向内

```js
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
}) // 1 2 4 6 5 3 ""

JSON.stringify({"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}, function (k, v) {
    console.log(k); 
    return v;      
}) // "" 1 2 3 4 5 6
```

# 参考链接

- [JSON对象](https://javascript.ruanyifeng.com/stdlib/json.html)
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)

# 最后

虽然本文罗嗦了点，但还是感谢各位观众老爷的能看到最后 O(∩_∩)O 希望你能有所收获 😁
