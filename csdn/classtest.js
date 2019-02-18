var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('test class');
var O = /** @class */ (function () {
    function O() {
        this.initData();
    }
    O.prototype.initData = function () { };
    Object.defineProperty(O.prototype, "x", {
        set: function (value) { console.log(value); this._x = 1; },
        enumerable: true,
        configurable: true
    });
    return O;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = this;
        _this.id = 10;
        _this.x = 20;
        _this.a = 1;
        console.log(' c c');
        _this = _super.call(this) || this;
        return _this;
    }
    C.prototype.initData = function () {
        console.log('initData', this.constructor == C2);
        this.s = { s: 1 };
        this.id = { id: 1 };
        this.x = 'x';
    };
    C.s = 1;
    return C;
}(O));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2(ques, parent) {
        if (ques === void 0) { ques = {}; }
        var _this = _super.call(this, ques, parent) || this;
        _this.init();
        return _this;
    }
    C2.prototype.init = function () {
        console.log('c2 init', JSON.stringify(this), this.s, this === C2);
    };
    return C2;
}(C));
var c = new C2();
console.log('ccc', c);
