function baseFunc(test) {
}
baseFunc({});
baseFunc({ name: "a", sex: 1 });
var bad = { name: "a", sex: 1 };
baseFunc(bad);
var good = { name: "a", sex: 2 };
baseFunc(good);
function baseFuncOption(test) {
}
baseFuncOption({ name: "a" });
baseFuncOption({ name: "a", sex: 1 });
function extraFunc(test) {
}
extraFunc({ name: 'a', sex: 1 });
var readonlyObj = {
    x: 10
};
// readonlyObj.x=11;
var arr = [1, 2, 3];
var func;
func = function (name, age) {
    return (_a = {}, _a[name] = age, _a);
    var _a;
};
func('a', 1);
var obj;
obj = {
    name: '11',
    func: function (key) { return true; }
};
var ImplementClass = (function () {
    function ImplementClass(name, age) {
        this.key = name;
    }
    ImplementClass.prototype.func = function (str) {
        return true;
    };
    return ImplementClass;
}());
var d = new ImplementClass('a', 1);
var mis = {
    name: '1',
    age: 10,
    sex: 1
};
//# sourceMappingURL=interface.js.map