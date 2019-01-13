var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function test(target) {
    target.prototype.show = function show() {
        alert(2);
    };
}
var Test = (function () {
    function Test() {
    }
    Test.prototype.show = function () {
    };
    Test = __decorate([
        test
    ], Test);
    return Test;
}());
var t = new Test();
t.show();
d = 'a';
//# sourceMappingURL=csdn.js.map