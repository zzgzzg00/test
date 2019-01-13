class Test {
    add<T, K>(a:T,b:K): K {
        return b;
    }
}

let t = new Test();
t.add<string, number>('a', 1);
t.add<number, number>(1, 1);