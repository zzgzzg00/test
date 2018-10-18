var g1 = {
    name: 1,
    fun: function (key) { return key; }
};
g1.fun(1);
var g2 = {
    name: [1],
    fun: function (key) { return key; }
};
g2.fun([1]);
var Test = (function () {
    function Test(name) {
        this.name = name;
    }
    Test.prototype.func = function (key) {
        return key;
    };
    return Test;
}());
var t1 = new Test(1);
t1.func(1);
var t2 = new Test([1]);
t2.func([1]);
//# sourceMappingURL=generics.js.map