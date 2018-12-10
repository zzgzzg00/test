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
var ARole = (function () {
    function ARole(name, role, age) {
        this.name = name;
        this.role = role;
        this.age = age;
    }
    Object.defineProperty(ARole.prototype, "zname", {
        get: function () {
            return this._zname;
        },
        set: function (value) {
            this._zname = value;
        },
        enumerable: true,
        configurable: true
    });
    ARole.showClass = function () {
        return ARole.name;
    };
    return ARole;
}());
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Role.prototype.show = function () {
        console.log(this.name, this.role);
    };
    return Role;
}(ARole));
var g = new Role('gjj', 'n', 32);
g.name;
// g.name = 'lm';
g.show();
g.zname = 'yn';
Role.showClass();
//# sourceMappingURL=modifier.js.map