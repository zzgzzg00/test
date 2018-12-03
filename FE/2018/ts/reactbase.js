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
var Component = (function () {
    function Component(props) {
        this.props = props;
    }
    return Component;
}());
var Test = (function (_super) {
    __extends(Test, _super);
    function Test(props) {
        return _super.call(this, props) || this;
    }
    return Test;
}(Component));
var props1 = {
    name: 'gjj',
    age: 32,
    sex: 2,
    role: 'n'
};
var props2 = {
    name: 'hy',
    sex: 3,
    age: 24,
    role: 'z'
};
var gjj = new Test(props1);
// let hy = new Test(props2);
//# sourceMappingURL=reactbase.js.map