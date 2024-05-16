---
typora-root-url: img
---

# 设计模式

## 设计模式介绍

```javascript
设计模式属于编程思想，每一种设计模式都会针对一定场景 有的是为了效率的提升有的是为了代码的可维护性
常见设计 模式
1、单例模式 永远一个对象
2、工厂模式
3、组合模式 开关
4、观察者模式
5、策略模式
......
```

## 单例模式

1、封装一个工具类

```javascript
// 1、封装工具类 因为以前的公共函数 会存在同名问题 这些公共函数都是为了提供辅助功能，将整体看做一个类 最后new出一个对象即可
class Tool {
    constructor() {

    }
    makeRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
let t = new Tool;
console.log(t.makeRandom(10,100));
// 如果后期还需要使用工具类型下的方法 还需要new对象
```

2、实现单例

```javascript
// 2、实现单例 可以将new出来的对象使用一个变量保存 以后每次使用该变量就可以
let instance = null;//保存工具类对象
function getInstance(){
    if(!instance){
        instance = new Tool;
    }
    return instance;
}
getInstance().makeRandom(1,29)
console.log(getInstance() == getInstance())
```

3、使用闭包保护变量

```javascript
// 3、解决变量命名问题
        function getInstance(){
            let instance = null;
            return function(){
                if(!instance){
                    instance = new Tool;
                }
                return instance;
            }
        }

        let getToolAction = getInstance();
        console.log(getToolAction() == getToolAction());
```

4、简化使用形式

```javascript
const tool = (function(){
            let instance = null;
            // 表示工具类
            class A{}
            return function(){
                if(!instance){
                    instance = new A;
                }
                return instance;
            }
        })();
        console.log(tool() == tool())
```

5、ES6中单例

```javascript
class Tool {
    // 静态属性
    static instance;
    constructor() {
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new Tool;
        }
        return this.instance;
    }
    makeRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
console.log(Tool.getInstance() == Tool.getInstance())
```

## 组合模式

```javascript
 class SnakeMap{
            init(){
                console.log('地图显示了')
            }
        }
        class Food{
            init(){
                console.log('食物显示了')
            }
        }
        class Snake{
            init(){
                console.log('蛇显示了')
            }
        }

        // 总开关的构造函数
        class OnOff{
            constructor(){
                // 保存最后需要控制的对象
                this.tasks = [];
            }
            // 实现添加总开关中需要控制的对象
            addTask(obj){
                this.tasks.push(obj);
            }
            start(){
                this.tasks.forEach(item=>{
                    item.init();
                })
            }
            
        }


        let kg = new OnOff();

        kg.addTask(new SnakeMap);
        kg.addTask(new Food);
        kg.addTask(new Snake);
        kg.start();

```

## 数组坍塌问题

```javascript
let arr = [1, 2, 3, 4];
/*
    i=0  执行arr.splice(0,1)  结果[2,3,4];
    i=1  执行arr.splice(1,1)  结果[2,4];
    i=2 条件不成立

*/


// for (let i = 0; i < arr.length; i++) {
//     arr.splice(i, 1);
// }
// 反向删除
// for (let i = arr.length-1; i >=0; i--) {
//     arr.splice(i, 1);
// }
// 手动修改下标
// for (let i = 0; i < arr.length; i++) {
//     arr.splice(i, 1);
//     i--;
// }

while (arr.length > 0) {
    arr.splice(0, 1);
}

console.log(arr);
```

## 观察者模式

### 观察者模式介绍

```javascript
观察者模式是用于监视数据改变之后的处理策略
例如上课摄像头后班主任可以查看每个人的情况，一旦有人违纪 立马可以进行相关的处理
```

### 实现观察者模式

1、核心代码

```javascript
class Watch {
    constructor() {

    }
    // 实现通知监视器 需要监视那些行为
    add() { }
    // 一定行为触发了 做什么
    emit() { }
    // 解除监视行为
    remove() { }
    // 清除监视的行为
    clear() { }
}
```

2、设置构造函数增加属性

```javascript
constructor() {
    // 记录下自定义事件与对应的事件处理程序关系 使用对象格式 属性名称使用事件名称 属性值 需要使用函数 但是需要实现一个事件上可以存在多个处理程序 所以使用数组格式 数组中每一个元素就是一个事件处理程序
    this.events = {}
}
```

3、实现add方法

```javascript
// 实现通知监视器 需要监视那些行为 第一个参数是事件名称 第二个参数事件处理程序
add(typeName,handler) {
    if(this.events[typeName]){
        // 说明以前已经针对这个事件设置了处理程序
        this.events[typeName].push(handler);
    }else{
        this.events[typeName] = [handler];
    } 
    console.log(this.events)
}
```

4、实现remove

```javascript
            // 解除监视行为
            remove(typeName, handler) {
                // 说明目前事件没有被监视
                if (!this.events[typeName]) {
                    return false;
                }
                for (let i = 0; i < this.events[typeName].length; i++) {
                    if(this.events[typeName][i] == handler){
                        this.events[typeName].splice(i,1);
                        i--;
                    }
                }

            }
```

5、实现clear

```javascript
// 清除监视的行为
            clear(typeName) { 
                // 说明目前事件没有被监视
                if (!this.events[typeName]) {
                    return false;
                }

                delete this.events[typeName];
            }
```



6、实现触发

```javascript
// 一定行为触发了 做什么
emit(typeName,param) { 
    // 说明目前事件没有被监视
    if (!this.events[typeName]) {
        return false;
    }
    let event = {
        type:typeName,
        time:Date.now()
    }
    Object.assign(event,param);
    this.events[typeName].forEach(item=>{
        item(event);
    })

}
```

# 前后端交互概述

## 项目开发流程

1、产品需求分析，最终会得到产品原型

2、UI设计

3、前端实现界面

4、后端提供数据支持(接口)

5、代码提交测试

6、代码发布线上

## 前后端分离

```javascript
对于浏览器端虽然写出了页面，效果。但是不具备操作数据的能力（整个项目中所有可以动态改变的的都是数据）。所以需要找后端来操作到数据。这种叫做前后端的分离
例如：实现登录功能
1、显示登录表单
2、登录按钮上给定点击事件接受到用户的输入信息
3、将输入的信息交给后端进行处理 后端接受后进行相关的处理
4、后端将结果发送给前端
5、前端根据后端的结果进行逻辑的功能
```

# Ajax概述

## ajax介绍

## ajax使用示例

