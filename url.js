function query(name) {
    var search = location.search;
    if (arguments.length == 0) {
        var s = search.subsur(1)
        var obj = {}
        search.match(//)
    } else {
        var a = new URLSearchParams(search)
        return a.get(name)
    }
}
query('a')

// 对于每个数组元素调用函数f()，并返回一个结果数组
var map = Array.prototype.map               // 如果Array.prototype.map定义了的话就使用这个方法
    ? function(a,f) {return a.map(f)}       // 如果已经存在map方法，就直接使用它
    : function(a,f) {                       // 否则自己实现一个
        var results = [];
        for (var i = 0, len = a.length; i < len; i++) {
            if (i in a) results[i] = f.call(null, a[i], i, a)
        }
        return results;
    };


// 使用函数f()和可选的初始值将数组a减至一个值
var reduce = Array.prototype.reduce          // 如果Array.prototype.reduce存在的话，就使用这个方法
    ? function(a, f, initial) {              // 如果reduce()方法存在的话
        if (arguments.length > 2) {
            return a.reduce(f, initial);     // 如果传入了一个初始值
        } else {
            return a.reduce(f)               // 否则没有初始值
        }
    }
    : function(a, f, initial) {              // 这个算法来自ES5规范
        var i = 0, len = a.length, accumulator;
        if (arguments.length > 2) accumulator = initial;   // 以特定的初始值开始，否则第一个值取自a
        else {                                             // 找到数组中第一个已定义的索引
            if (len == 0) throw TypeError();
            while (i < len) {
                if (i in a) {
                    accumulator = a[i++];
                    break;
                }
                else i++;
            }
            if (i == len) throw TypeError();
        }
        // 对于数组中剩下的元素依次调用f()
        while (i < len) {
            if (i in a) { accumulator = f.call(undefined, accumulator, a[i], i, a)};
            i++;
        }
        return accumulator;
    }


// 手写call
Function.prototype.myCall = function() {
    var realThis = arguments[0] || window
    var realArgs = [...arguments].slice(1)
    realThis.func1 = this
    var result = realThis.func1(...realArgs)
    delete realThis.func1
    return result
}

// 手写apply
Function.prototype.myCall = function() {
    var realThis = arguments[0] || window
    var realArgs = arguments[1]
    realThis.func2 = this
    var result = realThis.func2(...realArgs)
    delete realThis.func2
    return result
}

// 手写bind
