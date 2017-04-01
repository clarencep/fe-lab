# 测试 `express` 框架中的参数：

> 这个需要开启服务端(`npm run server`)，看服务端的日志。

注意：`req.params` 只有在参数化的路径中的参数。查询字符串中的参数要用 `req.query`.

比如
 
```js
// server.js:
app.post('/user/:id', function(req, res){
    console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)
    console.log('req.body: ', req.body)
})

```
```
// HTTP request:
POST /user/123?foo=1&bar=2
Content-Type: application/x-www-form-urlencoded

aaa=1&bbb=2
```

这样的请求，应该是要用 `req.query.foo` 和 `req.query.bar` 来获取 foo 和 bar 的值，最终打印出如下:

```text
req.params:  { id: '123' }
req.query:  { foo: '1', bar: '2' }
req.body:  { aaa: '1', bbb: '2' }
```

## 关于 `req.body` 

此外，`express` 框架本身是没有解析 `req.body` 的 -- 如果打印出来 `req.body: undefined`则说明没有安装解析 `req.body` 的插件：

为了解析 `req.body` 一般可以安装 `body-parser` 这个插件：

```

// 假设 `app` 是 `express` 的实例：

const bodyParser = require('body-parser')

// 在所有路由前插入这个中间件：

app.use(bodyParser.urlencoded())

```

这样就可以了。

`bodyParser.urlencoded()`是HTML中默认的查询字符串形式的编码,即`application/x-www-form-urlencoded`. 如果需要解析其他格式的，则需要分别加入其他格式的中间件，比如：

 - `bodyParser.json()` 支持JSON格式（`application/json`）
 - `bodyParser.raw()` 将会把 `req.body` 置为一个 `Buffer` (Content-Type：`application/octet-stream`)
 - `bodyParser.text()` 将会把 `req.body` 置为一个 `string` (Content-Type: `text/plain`)

然而上传文件用的 `multipart/form-data` 格式却没有被 `bodyParser` 所支持，需要使用 `busboy` 之类的其他中间件

