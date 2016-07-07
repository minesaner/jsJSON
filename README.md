#jsJSON
更方便的方式获取或设置 JSON 数据
##原生处理 JSON 数据的弊端
读取或设置数据前要保证对应字段不是 `null` 或 `undefined`，否则操作会出现异常
###例如有以下对象
```javascript
var obj = {
	maybeNull: {
		maybeUndefined: {
			data: 'data'
		}
	}
};

```
###原生 js
```javascript
var f1;

if (obj.maybeNull && obj.maybeNull.maybeUndefined) {
	f1 = obj.maybeNull.maybeUndefined.data;
}
```

###jsJSON 有任何字段不存在时返回 `undefined`
```javascript
var f1 = J(obj).get('maybeNull.maybeUndefined.data');
```

##构建
使用 git clone 代码到本地
```
git clone git@github.com:minesaner/jsJSON.git
```
进入文件夹执行
```
npm install
```
然后执行 webpack 命令
```
node_modules/.bin/webpack
```
如果 webpack 已全局安装
```
webpack
```
执行完毕后会在 `./build` 目录下生成构建完成的文件  
可通过 `require` 方法或 `window.J` 引用

##用法
###将对象构建为可处理的对象
```javascript
var jsJSON = J(obj);
```

###get([field])
获取指定字段的值，不提供 `field` 时返回构建对象
>`field`: 以点号分隔的对象字段的字符串表示形式  

###getString([field])
将得到的值转为字符串，`null`、`undefined` 会转为空字符串，
不提供 `field` 时调用 `toJSON` 返回

###getNumber(field)
将得到的值转为数字，不可以转换成数字的值以 0 返回

###toJSON()
返回对象的 JSON 字符串形式

###equal(field, value)
以 `===` 比较得到的值与 `value`

###deepEqual(field, value)
以内容比较得到的值与 `value`

###set(field, value[, cover])
设置对应字段内容
>`cover`: 当要设置的字段的父值为 `number`、`string`、`boolean` 这些基本类型时
是否以对象覆盖

###例如
```javascript
var obj = {a:1};
var j = J(obj);

j.set('a.a', 11); // set `cover` to a false value
console.log(j.toJSON()); // {a:1}
j.set('a.a', 11, true); // set `cover` to a true value
console.log(j.toJSON()); // {a:{a:11}}
```

###delete(field)
删除对应字段

###has(field)
是否包含某字段

###isEmpty()
判断内部构建对象是否包含值

###empty()
清空对象

###store(storage, key)
将对象存储在指定的 Storage（localStorage/sessionStorage） 中

###unstore()
将存储的对象从 Storage 中移除
