var Test = (function () {
    function Test() {
    }
    Test.prototype.add = function (a, b) {
        return b;
    };
    return Test;
}());
var t = new Test();
t.add('a', 1);
t.add(1, 1);
//# sourceMappingURL=classgen.js.map