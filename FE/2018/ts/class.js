var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Test = (function () {
    function Test(name) {
        if (name === void 0) { name = 'a'; }
        this.name = name;
        this.age = 10;
    }
    return Test;
}());
var t = new Test();
console.log(t.name);
// console.log(t.age);
var Base = (function () {
    function Base(name) {
        this.name = name;
    }
    return Base;
}());
var Son = (function (_super) {
    __extends(Son, _super);
    function Son(name) {
        var _this = _super.call(this, name) || this;
        _this.age = 10;
        return _this;
    }
    return Son;
}(Base));
var Test2 = (function () {
    function Test2(name) {
        this.name = name;
    }
    return Test2;
}());
//存在类似java的类型转换
var b = new Base('a');
var s = new Son('a');
var t2 = new Test2('a');
b = s;
// s=b;
// t2=b;
// b=t2;
var ATest = (function () {
    function ATest(name) {
        this.name = name;
    }
    return ATest;
}());
var ITest = (function (_super) {
    __extends(ITest, _super);
    function ITest(name) {
        return _super.call(this, name) || this;
    }
    ITest.prototype.show = function () {
        console.log(this.name);
    };
    return ITest;
}(ATest));
var it = new ITest('a');
// let at=new ATest('a');
var it2 = new ITest('a');
var it3 = ITest;
//# sourceMappingURL=class.js.map