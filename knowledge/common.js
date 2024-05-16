// 接口的基础地址
const API_BASE_URL = 'http://edublog.phpclub.org.cn';



/**
 * 设置cookie
 * @param {String} key 
 * @param {String} value 
 * @param {Number} expires cookie的有效时间 使用秒数来传递 如果是0表示关闭浏览器cookie失效 
 */
function setCookie(key, value, expires = 0) {
    if (expires == 0) {
        // 关闭浏览器cookie失效
        document.cookie = `${key}=${value};path=/`
    } else {
        console.log(11111)
        let d = new Date;
        // 以当前时间计算出失效的时间 减掉8小时是因为要以格林威治时间计算
        d.setTime(d.getTime() + expires * 1000 - 8 * 3600 * 1000);
        document.cookie = `${key}=${value};path=/;expires=` + d;
    }

}
/**
 * 获取cookie
 * @param {*} key 
 * @returns 
 */
function getCookie(key) {
    return str2Object(document.cookie, '; ')[key]
}
/**
 * 删除cookie
 * @param {*} key 
 */
function reomoveCookie(key) {
    setCookie(key, '', -1000);
}

/**
 * 获取URL地址上指定名称的参数
 * @param {String} key 获取参数名称 
 */
function getUrlParam(key) {
    return str2Object(location.search.slice(1))[key];
}
/**
 * 获取页面上元素的dom对象函数
 * @param {String} selector css选择器
 * @param {Boolean} isMore 表示是否需要取出单个dom对象 true表示单个dom对象 false表示需要伪数组
 */
function $$(selector, isMore = true) {
    return isMore ? document.querySelector(selector) : document.querySelectorAll(selector);
}


/**
 * promise版本的ajax
 * @param {Object} options 对象 与ajax函数参数类似 但是不需要传递success
 * @returns 
 */
function pajax(options) {
    return new Promise((resolve, reject) => {
        // 使用者不传递success函数 手动补充 因为ajax函数一定要success
        options.success = function (response) {
            // 修改promise的状态 为成功 就是将then中第一个匿名函数调用起来了
            resolve(response)
        }
        ajax(options);
    });
}

/**
 * 发送ajax请求函数
 * @param {Object} options 请求的参数配置 
 */
function ajax(options) {
    // 1、设置默认配置
    let config = {
        type: 'get',//请求方式 默认值为get  可以支持 get,post,put,delete
        url: '',//表示请求地址
        data: '',//表示请求所携带的参数信息，格式支持字符串或者对象格式
        success: function () { },//成功获取到服务端数据回调
        dataType: 'json',//服务端返回数据格式 默认为JSON格式
        headers: {
            "Content-Type": "application/json"
        }
    }

    // 3.5、检查请求头的格式 因为为了方便使用 如果不传递content-Type 默认使用json格式的头 传递了就覆盖
    if (Object.prototype.toString.call(config.headers) != '[object Object]') {
        throw new Error('头的格式错误')
    }
    // 2、参数合并
    for (let key in config) {
        if (key == 'headers') {
            // Object.assign实现对象合并功能 
            options[key] != undefined && Object.assign(config.headers, options.headers)
        } else {
            // 如果用户传递了对应配置项 就覆盖默认配置
            options[key] != undefined && (config[key] = options[key]);
        }

    }

    // 3、配置项参数验证
    // 3.1、验证请求方式
    config.type = config.type.toLowerCase();//字符串转换为小写
    let allowType = ['get', 'post', 'put', 'delete'];
    if (!allowType.includes(config.type)) {
        throw new Error('请求方式错误 只支持' + allowType)
    }
    // 3.2、验证请求url  startsWith 字符串内置方法 验证是否以指定的字符串开头的
    if (!config.url.startsWith('http://') && !config.url.startsWith('https://')) {
        throw new Error('请求地址错误')
    }
    // 3.3、验证请求参数数据类型
    // 获取请求携带参数的数据类型
    let dataType = Object.prototype.toString.call(config.data).slice(8, -1)
    if (dataType != 'Object' && dataType != 'String') {
        throw new Error('请求参数格式错误')
    }
    // 3.4、验证success
    if (Object.prototype.toString.call(config.success) != '[object Function]') {
        throw new Error('回调格式错误')
    }

    // 4、获取到Ajax对象
    let xhr = new XMLHttpRequest;
    // 5、打开连接
    let url = config.url;
    // 如果是get或者delete请求 修改url地址  可能需要附加参数信息
    if (config.type == 'get' || config.type == 'delete') {
        // 如果请求参数是字符串类型 直接在url地址后拼接 否则 就将对象下么一个属性组合后拼接到url地址后
        let queryStr = config.data;
        if (dataType == 'Object') {
            queryStr = object2Str(config.data);
        }
        queryStr && (url = url + '?' + queryStr);
    }
    xhr.open(config.type, url);
    // 6、设置请求头
    for (let key in config.headers) {
        xhr.setRequestHeader(key, config.headers[key]);
    }
    // 7、发送请求
    let requestBody = null;
    if (config.type == 'post' || config.type == 'put') {
        requestBody = config.data;
        if (dataType == 'Object') {
            // 传递的是对象格式 将对象格式转换为字符串
            switch (config.headers['Content-Type']) {
                case "application/json":
                    requestBody = JSON.stringify(config.data);
                    break;
                case "application/x-www-form-urlencoded":
                    requestBody = object2Str(config.data);
                    break
                default:
                    requestBody = config.data.toString();
                    break;
            }
        }
    }
    xhr.send(requestBody);
    xhr.onload = function () {
        // 这个位置才可以获取到服务端发回的数据
        let response = (config.dataType == 'json') ? JSON.parse(xhr.responseText) : xhr.responseText;
        // 使用回调函数 并且将服务端返回的数据传递
        config.success(response)

    }

}
/**
 * 将对象转换为字符串拼接的格式
 * @param {Object} obj 
 * @param {String} oeparator1 属性与属性之间连接符号
 * @param {String} oeparator2 属性名称与值直接的连接符号
 */
function object2Str(obj, oeparator1 = '&', oeparator2 = '=') {
    let result = '';
    for (let key in obj) {
        result += `${key}${oeparator2}${obj[key]}${oeparator1}`;
    }
    return result.slice(0, -1);
}
/**
 * 将字符串按照指定的分隔符转换为对象
 * @param {*} str 
 * @param {*} oeparator1 
 * @param {*} oeparator2 
 * @returns 
 */
function str2Object(str, oeparator1 = '&', oeparator2 = '=') {
    let result = {};
    str.split(oeparator1).forEach(item => {
        let keyValue = item.split(oeparator2);
        result[keyValue[0]] = keyValue[1]
    })
    return result;
}
/**
 * 生成随机整数
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function makeRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 获取标签的样式
 * @param {Element} element 
 * @param {String} attrName 
 */
function getStyle(element, attrName) {
    try {
        return window.getComputedStyle(element)[attrName];
    } catch (error) {
        return element.currentStyle[attrName];
    }
}

/**
 * 防抖函数
 * @param {Function} handler 
 * @param {Number} time 
 * @returns 
 */
function antiShake(handler, time) {
    let timer;
    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handler.call(this, event);
        }, time)
    }
}

/**
 * 节流函数
 * @param {Function} handler 
 * @param {Number} time 
 * @returns 
 */
function throttle(handler, time) {
    let start = Date.now();
    return function () {
        let end = Date.now();
        if (end - start >= time) {
            handler()
            start = end;
        }
    }
}