interface Test {
    name: string;
    age: number;
}
type Rtest = Readonly<Test>;

const t: Test = {
    name: 'gjj',
    age:33
}
const rt: Rtest = {
    name: 'lm',
    age:32
}
t.name = 'aa';
// rt.name = 'ss';

export {};