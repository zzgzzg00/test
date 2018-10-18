var ifunc = function (key) { return key; };
ifunc('a');
var funArr = [function (key) { return key; }, function (key) { return key; }];
funArr[1]('');
var objfun = {
    name: '1',
    fun1: function (key) { return key; },
    fun2: function (key) { return key; }
};
//# sourceMappingURL=func.js.map