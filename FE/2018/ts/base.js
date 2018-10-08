var str = 'a';
var num = 1;
var arr = [1, 2, 3];
var arr2 = [1];
var tuple = ['a', 1, 1];
var Color;
(function (Color) {
    Color[Color["A"] = 0] = "A";
    Color[Color["B"] = 1] = "B";
    Color[Color["C"] = 2] = "C";
})(Color || (Color = {}));
function enumTest(test) {
}
enumTest(Color.A);
