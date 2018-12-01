function test(name: string): string;
function test(age: number): number;
function test(value) {
    return value+1;
}
console.log(test(1));
console.log(test('sss'));