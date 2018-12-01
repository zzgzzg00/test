var NN;
(function (NN) {
    var Hy = (function () {
        function Hy() {
        }
        Hy.prototype.command = function (command) {
            console.log(command);
        };
        return Hy;
    }());
    NN.Hy = Hy;
    var Gjj = (function () {
        function Gjj() {
        }
        Gjj.prototype.action = function (command) {
            console.warn(command);
        };
        return Gjj;
    }());
    NN.Gjj = Gjj;
})(NN || (NN = {}));
var hy = new NN.Hy();
var gjj = new NN.Gjj();
//# sourceMappingURL=namespace.js.map