---
typora-copy-images-to: media
---

## AJAX和Promise

### 回调函数

概念：将一个函数当做参数传入另一个函数的时候，这个函数就叫回调函数。

我们之前用过很多次回调函数，比如：数组方法map、filter等；运动函数中处理运动结束传入的函数；分页插件中使用插件的时候执行的函数。。。包括封装的ajax中，请求成功以后执行的success函数。都是回调函数。

为什么要使用回调函数？

当我们执行一些异步操作的时候，需要在操作完成以后，做另外的一些事情，但是我们又没有办法预知这个异步操作什么时候结束，此时只能使用回调函数的形式来解决这个问题。

### 回调地狱

我们在封装ajax的时候，发现：请求成功后的值不能直接返回给调用者，而需要在其内部执行一个回调函数。如果在请求一次后需要再次请求，那么，也就是在回调函数中需要再次调用ajax，再次传入回调函数，次数多了以后，代码是下面这个样子：

| 回调地狱                                  |
| ----------------------------------------- |
| ![1567217568465](media/1567217568465.png) |

这样的代码难以阅读和维护，这是著名的”回调地狱“。

例：已知数据 - "包河区"，查到隶属的省份

```js
var str = '包河区';
sendAjax({
    url:"area.php",
    data:{
        areaName:str
    },
    success:function(res){
        var pid = res.pid;
        sendAjax({
            url:"city.php",
            data:{
                pid:pid
            },
            success:function(res){
                var pid = res.pid
                sendAjax({
                    url:"province.php",
                    data:{
                        pid:pid
                    },
                    success:function(res){
                        var provinceName = res.name;
                        console.log(provinceName)
                    }
                })
            }
        })
    }
})
```

这种嵌套多了以后，就会形成回调地狱。

es6为了解决这个问题，所以新增了promise语法。

### Promise

promise是承诺的意思，表示他承诺帮你做这件事情，然后将结果给你。

语法：

```js
new Promise(function (resolve, reject) {
  // resolve 表示成功的回调
  // reject 表示失败的回调
}).then(function (res) {
  // 成功的函数
}).catch(function (err) {
  // 失败的函数
})
```

在promise构造函数中，提供了两个参数，分别表示执行成功和失败的回调函数，执行成功调用resolve，失败调用reject即可，具体resolve和reject的执行，分别在then和catch中。

这样可以将回调函数变成链式结构，从而解决了回调地狱的问题。

例：

```js
var str = '包河区';
new Promise(function(resolve,reject){
    sendAjax({
        url:"area.php",
        data:{
            areaName:str
        },
        success:function(res){
            resolve(res);
        }
    });
}).then(function(res){
    var pid = res.pid
    return new Promise(function(resolve,reject){
        sendAjax({
            url:"city.php",
            data:{
                pid:pid
            },
            success:function(res){
                resolve(res);
            }
        });
    })
}).then(function(res){
    var pid = res.pid;
    return new Promise(function(resolve,reject){
        sendAjax({
            url:"province.php",
            data:{
                pid:pid
            },
            success:function(res){
                resolve(res);
            }
        });
    })
}).then(function(res){
    var provinceName = res.name;
    console.log(provinceName)
}).catch(function(){
    console.log("出错了");
});
```

使用说明：

1. promise的then可以直接写在对象后面
2. 如果在promise的then里面返回一个promise对象，那么里面的promise的then可以跟在外面的promise的then后面

补充：then和catch不会同时触发，也就是说，只要一个then出错了，执行最底下的catch就行，所以也就可以连续写多个then，一个catch就行。

promise成功解决了回调地狱的问题，但是这对于我们一个追求完美的攻城狮来说，远远不够，我们希望可以再次优化。

将ajax封装到promise中：将sendAjax中的success换成resolve，将sendAjax中的error换成reject

调用方式：

```js
var str = '包河区';
pAjax({
    url:"area.php",
    data:{
        areaName:str
    }
}).then(function(res){
    var pid = res.pid
    pAjax({
        url:"city.php",
        data:{
            pid:pid
        }
    })
}).then(function(res){
    var pid = res.pid
    pAjax({
        url:"province.php",
        data:{
            pid:pid
        }
    })
}).then(function(res){
    var provinceName = res.name;
    console.log(provinceName)
}).catch(function(){
    console.log("出错了");
});
```

### ASYNC/AWAIT

es7提供了async/await来编写异步代码，是回调地狱的终极解决方案。

他可以将异步代码写的和同步代码一样。

语法：

```js
async function fn() {
	const res = await promise对象
}
```

只要是一个 promise 对象，那么我们就可以使用 `async/await` 来书写

例：

```js
async function fn(){
    var str = '包河区';
    var res = await new Promise(function(resolve,reject){
        sendAjax({
            url:"area.php",
            data:{
                areaName:str
            },
            success:function(res){
                resolve(res)
            },
            error:functioin(){
                reject()
            }
        })
    })
    var pid = res.pid;
    res = await new Promise(function(resolve,reject){
        sendAjax({
            url:"city.php",
            data:{
                pid:pid
            }
            success:function(res){
                resolve(res)
            },
            error:functioin(){
                reject()
            }
        })
    })
	res = await new Promise(function(resolve,reject){
        sendAjax({
            url:"province.php",
            data:{
                pid:pid
            }
            success:function(res){
                resolve(res)
            },
            error:functioin(){
                reject()
            }
        })
    })
    var provinceName = res.name;
    console.log(provinceName)
}
fn();
```

使用说明：

1. async修饰的函数，需要调用的话，就正常调用
2. await必须包在async修饰的函数中

将async和封装的promise结合起来封装：

```js
async function fn(){
    var str = '包河区';
    var res = await pAjax({
        url:"area.php",
        data:{
            areaName:str
        }
    })
    var pid = res.pid;
    res = await pAjax({
        url:"city.php",
        data:{
            pid:pid
        }
    })
    pid = res.pid;
	res = await pAjax({
        url:"province.php",
        data:{
            pid:pid
        }
    })
    var provinceName = res.name;
    console.log(provinceName)
}
fn();
```

### 跨域

正常情况下，我们使用ajax请求的数据都在自己的服务器上。但在一些特定的场景中，我们需要获取到别人的服务器上的数据，也就是在自己的服务器中的ajax要请求到别人的服务器的网址，这就是跨域。但是浏览器是不允许这样操作的，因为浏览器有同源策略。

同源策略：所谓同源，就是指域名、协议、端口都相同。比如说：在自己的localhost域名下请求www.baidu.com下的内容，这样的协议首先就不同，自己的是http，百度的是https，所以会被同源策略限制。

如果解决跨域？

1. 使用php做代理

   也就是说跨域请求只是限制客户端向服务端，如果是服务端向服务端请求的话就不存在这个问题，也就是说需要跨域的请求交给php服务端来做，有了结果再响应给ajax即可。

   原理上利用的php的爬虫技术。有`file_get_contents()`、`curl`、`ob_get_contents()`

   配置虚拟主机：

   ```
   在phpStudy的其他选项菜单中，选择站点域名配置，在打开的页面中，输出自定义域名和对应的文件夹路径，然后点击新增，再点击保存并生成配置文件。
   打开 C:\Windows\System32\drivers\etc\hosts 文件，在该文件末，添加：
   	127.0.0.1 自定义域名
   然后重启服务器。
   接下来就可以在自定义文件夹路径中，新建文件，在浏览器中输入：自定义域名/文件名称 进行访问
   ```

   

2. 在服务端设置响应头，允许跨域请求

   如果请求的服务端是自己可操作的话，可以在php端设置允许跨域的响应头。代码如下：

   ```js
   header("Access-Control-Allow-Origin:*");
   ```

   

3. 使用服务器代理(nginx)

   在nginx配置文件中配置代理，具体配置如下：

   ```shell
   location = 自定义url {
       proxy_pass 待跨域请求的地址
   }
   ```

   

4. 通过jsonp来实现

   利用标签可以跨域（当前网页的图片链接可以是别的网站上的图片）的特性，制作标签进行跨域

   js代码：

   ```js
   var script=document.createElement('script');
   script.setAttribute('src',"http://www.php.com/test.php?callback=response");
   $('head').append(script);
   function response(res){
       $('#result').text(res);
       script.parentNode.removeChild(script); // 执行完成后将这个标签删掉
   }
   ```

   php代码：

   ```php
   $fun=$_GET['callback'];
   echo "$fun(".$str.")";
   
   ```

   封装jsonp：

   ```js
   function jsonp(obj){
       if(!obj.url){
       	throw new Error('跨域地址不能为空')   
       }
       if(!obj.success){
           throw new Error('回调函数不能为空')  
       }
       obj.url += '?cb=cb'
       window.cb = obj.success
       switch(Object.prototype.toString.call(obj.data)){
           case '[object String]':
               obj.url += "&"+obj.data
           break;
           case '[object Object]':
               for(var attr in obj.data){
                   obj.url += '&' + attr + '=' + obj.data[attr]
               }
           break;
           case '[object Undefined]':
           break;
           default:
               throw new Error('请求数据的格式不对')
           break;
       }
       var script = document.createElement('script')
       script.src = obj.url;
       document.head.appendChild(script)
       document.head.removeChild(script)
   }
   jsonp({
       url:'',
       data:'',
       success:function(res){
           console.log(res)
       }
   })
   ```

   







