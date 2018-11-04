function test() {
    return {};
}
var forb = test();
forb.eat('a');
//对于联合类型变量的使用 只能使用联合类型的公有字段 否则需要类型断言
//forb.swim();
forb.swim();
//# sourceMappingURL=or.js.map