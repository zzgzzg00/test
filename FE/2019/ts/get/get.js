"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = (function () {
    function Test(_name) {
        this._name = _name;
    }
    Object.defineProperty(Test.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Test;
}());
var t = new Test('a');
//# sourceMappingURL=get.js.map