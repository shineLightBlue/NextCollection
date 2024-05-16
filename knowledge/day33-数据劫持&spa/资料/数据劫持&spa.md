# 数据劫持

## 双向绑定

```html
<!-- 框架中双向绑定想要实现的是数据与视图任何一个部分改变其他的跟着改变 -->
<div id="app">
<div>{{title}}</div>
<input type="text" v-model="nickname">
</div>
<script>
let vm = new Vue({
    el: '#app',
    data: {
        title: '康师傅绿茶',
        nickname: '罗一鸣'
    }
})
</script>
```

## 基础劫持

1、数据劫持概念

```javascript
就是捕获到数据的任何操作，读取数据、修改数据
```

2、defineProperty

```javascript
/*
    defineProperty 用于设置对象下的属性 可以完成劫持功能
    Object.defineProperty(obj, prop, descriptor)
    第一个参数指定对象名称
    第二个参数表示指定属性名称
    第三个参数 是对属性配置 要求是一个对象 对象下可以设置的属性名称是固定
*/
let obj = {
    age: 28
};
Object.defineProperty(obj, 'name', {
    // value: '张三',//设置属性值,
    // writable: true,//控制属性值是否可以修改 默认为false 表示不能修改
    // enumerable: true,//控制属性是否可以被遍历 默认false 不能遍历
    // configurable: true,//控制属性是否可以被删除 默认false 不能删除
    // 系统内置提供get与set  表示只要读取或者修改属性 自动调用的函数 一般设置 get、set 上面的配置就不会设置
    get() {
        console.log('有人想要读取name属性，被我抓到了')
        return '李四';
    },
    // set是修改器 一旦想要修改数据会自动被调用 并且想要修改的值也会被作为第一个参数传递
    set(value) {
        console.log('有人想要修改数据，' + value + '被我击毙了');
        // console.log(this)
        // this.name = value 这个代码不能写  可以修改其他的变量或者属性都可以就是不能修改自己
    }
})

console.log(obj)
// for(let key in obj){
//     console.log(key)
// }
```

3、基础劫持

```javascript
<h1 id="title"></h1>
    <h1 id="content"></h1>
    <script>
        // 数据源
        let source = {
            title: '赵春阳的千锋生活照',
            content: '每天都会奖励自己'
        };
        // 劫匪
        let target = {};

        Object.defineProperty(target, 'title', {
            get() {
                console.log('有人读取title')
                return source.title;
            },
            set(value) {
                console.log('有人修改了title')

                source.title = value;
                document.querySelector('#title').innerHTML = source.title
            }
        })

        Object.defineProperty(target, 'content', {
            get() {
                console.log('有人读取content')
                return source.content;
            },
            set(value) {
                console.log('有人修改了content')

                source.content = value;
                document.querySelector('#content').innerHTML = source.content
            }
        })

        document.querySelector('#title').innerHTML = source.title
        document.querySelector('#content').innerHTML = source.content

    </script>
```

4、使用循环

```javascript
// 数据源
let source = {
    title: '赵春阳的千锋生活照',
    content: '每天都会奖励自己'
};
// 劫匪
let target = {};
for (let key in source) {
    Object.defineProperty(target, key, {
        get() {
            console.log('有人读取'+key)
            return source[key];
        },
        set(value) {
            console.log('有人修改了'+key)

            source[key] = value;
            document.querySelector('#'+key).innerHTML = source[key]
        }
    })
}
```

## 劫持加渲染页面

1、数据劫持的简单封装

```javascript
<div id="app">
        <h1>XXXX</h1>
    </div>
    <script>


function miniVue(data, cb) {
    // 是data的代理对象
    let target = {};
    for (let key in data) {
        Object.defineProperty(target, key, {
            get() {
                return data[key];
            },
            set(value) {
                data[key] = value;
                // 修改完毕数据需要更新页面上显示的内容  但是页面布局 不确定 使用回调 
                cb(target);
            }
        })
    }
    cb(target);
    // 将代理对象返回
    return target;
}
// data所接受的是返回的代理对象，通过代理对象可以操作到title
let data = miniVue({ title: '张三拿着冥币算嫖娼吗？' }, data => {
    document.querySelector('#app>h1').innerHTML = data.title
})

```

2、再次封装

```javascript
<div id="app">
        <h1>{{username}}</h1>
        <h2>{{ age }}</h2>
        <div>{{username}} </div>
    </div>
    <script>

        function VuePlus(options) {
            // 获取容器的dom对象
            let root = document.querySelector(options.el);
            if (!root) {
                throw new Error('缺少根元素');
            }
            // 获取到根元素中标签
            let rootHtml = root.innerHTML;
            if (Object.prototype.toString.call(options.data) != '[object Object]') {
                throw new Error('数据必须是对象格式');
            }
            // 设置代理对象
            let target = {};
            for (let key in options.data) {
                Object.defineProperty(target, key, {
                    get() {
                        return options.data[key];
                    },
                    set(value) {
                        console.log('有人想要修改数据 我需要更新视图')
                        options.data[key] = value;
                        // 更新视图
                        render(root, rootHtml, target);
                    }
                })
            }
            // 渲染视图
            render(root, rootHtml, target);
            return target;
        }

        function render(root, rootHtml, target) {
            console.log(target)
            // 将字符串中{{}}符号替换为对应的数据
            console.log(rootHtml)
            // 将字符串中所有的特殊符号全部找到
            let res = rootHtml.match(/\{\{\s*(.*)\s*\}\}/g);
            // 如果找不到特殊符号 res为null
            res && res.forEach(item => {
                // 获取到数据名称
                let key = item.slice(2,-2).trim();
                rootHtml = rootHtml.replace(item,target[key]);
            })
            root.innerHTML = rootHtml;
        }
        let a  = VuePlus({
            el: '#app',
            data: {
                username: 'javascript',
                age: 20
            }
        })
    </script>
```

# 数据劫持升级

## defineProperties

1、基本使用

```javascript
// defineProperties使用与defineProperty一模一样 但是支持复数方式 可以一次调用设置多个属性
let obj = {}
Object.defineProperties(obj,{
    // 属性名称就是要操作的对象属性名称,属性值与defineProperty一模一样
    name:{
        // value:'李四'
        get(){
            return '李四'
        },
        set(value){
            console.log('想要修改值为'+value)
        }
    },
    age:{
        // value:22
        get(){
            return 18
        },
        set(value){
            console.log('想要修改值为'+value)
        }
    }
})

        console.log(obj);
```

2、实现自我劫持

```javascript
        let data = {
            title: '叼德一',
            desc: 'XXX'
        }

        for (let key in data) {
            Object.defineProperties(data,{
                // 1、先将当前属性进行复制
                ['_'+key]:{
                    value:data.title,
                    writable:true
                },
                // 2、为当前属性设置get与set
                [key]:{
                    get(){
                        return data['_'+key]  
                    },
                    set(value){
                        console.log('修改数据')
                        data['_'+key] = value;
                    }
                }
            })
        }
        console.log(data)

```

## Proxy

1、defineProperty的弊端

```javascript
let data = {
    name: 'a',
    age: 20
}

let target = {}
for (let key in data) {
    Object.defineProperty(target, key, {
        get() {
            console.log('读取' + key + '属性')
            return data[key]
        },
        set(val) {
            console.log('修改' + key + '属性')
            data[key] = val;
        }
    })
}
//如果删除、添加属性  但是无法被捕获到
```

2、proxy实现代理

```javascript
 // proxy实现代理
let data = {
    name: 'a',
    age: 20
}
// new Proxy 返回一个代理对象
let p = new Proxy(data,{
    // data下所有的属性 只要读取都会自动的触发get函数
    // 三个参数分别表示 数据源对象，属性名称与代理对象
    get(source,propName,target){
        console.log('有人要读取值')
        return source[propName]
    },
    // data下所有的属性 只要修改都会自动的触发set函数
    // 三个参数跟别表示 数据源对象，属性名称与要修改的值
    set(source,propName,value){
        console.log('有人要修改值')
        source[propName] = value
    }
})
```



# SPA

## SPA概述

## 基础单页应用

## 抽离路由

## 路由重定向

## 路由懒加载