var TestI = (function () {
    function TestI(name, age) {
        this.name = name;
        this.age = age;
    }
    TestI.prototype.test = function (str) {
        return str;
    };
    return TestI;
}());
var t = 'test'; //只能为TestI的key：name|age|test
var refl = {
    name: 1,
    age: 1,
    test: 1
};
