### 📑 API

---

| action | 调用                            | 说明                                            |
| ------ | ------------------------------- | ----------------------------------------------- |
| 注册   | /auth/signup, or /auth/register | 保存用户信息，包括口令                          |
| 登录   | /auth/signin, or /auth/login    | 验证用户信息, 调用 authentication/authorization |
| 退出   | /auth/signout, or /auth/logout  | 取消 token                                      |
| User   | /auth/account                   | 查看 accounts                                   |
| Role   | /auth/role                      | 查看 roles                                      |

### 📑 Default favicon.ico

---

- When http://localhost:8066/auth, get warning:
<blockquote>
  GET http://localhost:8066/favicon.ico 404 (Not Found)
</blockquote>

to fix:

```shell script
$ cd ms-auth; touch favicon.ico
```

### 📑 Ms-Auth authentication and authorization

---

1. login / logout
2. register
3. authentication / issue access token
4. refresh tokens

According to standard, client should send `token` to server via HTTP request in a header called `Authorization` with the form `Bearer [JWT_TOKEN]`.

```text
headers: { 'Authorization': 'Bearer ...token...',  'Content-Type': 'application/json'}
```

### 📑 Mongoose Queries (5.10.1)

---

```text
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()
```

- association: ref, populate

```text
new mongoose.Schema({
    postBy: userSchema
    // Or:
    postBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
```

### [Https status](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

---

- redirect: 301, 302, 303, 307, 308

```text
100 Continue
101 Switching Protocols
103 Early Hints
200 OK
201 Created
202 Accepted
203 Non-Authoritative Information
204 No Content
205 Reset Content
206 Partial Content
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 URI Too Long
415 Unsupported Media Type
416 Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
422 Unprocessable Entity
425 Too Early
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
451 Unavailable For Legal Reasons
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
```

- http: `409` is the correct status code for duplicate resource or resource already exists.
- `res.redirect(307, '/auth/register')`: `307 Temporary Redirect (since HTTP/1.1)` In this occasion, the request should be repeated with another URI, but future requests can still use the original URI.2
  In contrast to `303`, the request method should not be changed when reissuing the original request. For instance, a `POST` request must be repeated using another POST request.
- The only difference between `307` and `302` is that `307` guarantees that the method and the body will not be changed when the redirected request is made.

### [Common System Errors](https://nodejs.org/api/errors.html#errors_common_system_errors)

---

This is a list of Express Server common errors:

- EACCES (Permission denied)
- EADDRINUSE (Address already in use)
- ECONNREFUSED (Connection refused)
- ECONNRESET (Connection reset by peer)
- EEXIST (File exists)
- EISDIR (Is a directory)
- EMFILE (Too many open files in system)
- ENOENT (No such file or directory)
- ENOTDIR (Not a directory)
- ENOTEMPTY (Directory not empty)
- ENOTFOUND (DNS lookup failed)
- EPERM (Operation not permitted)
- EPIPE (Broken pipe)
- ETIMEDOUT (Operation timed out)

### HTTP

---

1. Default MIME:

- Accept: _/_
- Content-type: text/plain

2. Response

The standard way to get full HttpResponse that includes following properties

- body //contains your data
- headers
- ok
- status
- statusText
- type
- url

```javascript
res.status === 200 && res.ok === true
```

3. res.send vs res.json

Main difference between `.json` and `.send` comes into picture when you have to pass non objects as a response. `.json` will convert non objects `(ex. null, undefined etc)` to JSON whereas `res.send` will not convert them. `.

- res.json: convert to JSON string using `JSON.stringify()`
- res.send: [], {}, '', Boolean, null, undefined.

### CORS and Same-Origin policy

---

[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 `POST` 请求），浏览器必须首先使用 `OPTIONS` 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

1. The same-origin policy is active `by default` and most browsers provide good error messages when actions cannot be executed because of same-origin policy issues. For instance, the following script defines an illegal cross-origin HTTP request.

```text
// document origin: https://example.com
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://codecentric.de');
xhr.send();

// fails with the following message in Google Chrome:
// XMLHttpRequest cannot load http://codecentric.de. No
// 'Access-Control-Allow-Origin' header is present on
// the requested resource. Origin 'https://example.com'
// is therefore not allowed access.
```

2. Cross-Origin Resource Sharing (`CORS`) can be used to `whitelist` origins for specific resources.

3. Cors + Nginx Proxying
