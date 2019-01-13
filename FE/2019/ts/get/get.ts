class Test {
    constructor(private _name:string) {

    }
    get name() {
        return this._name;
    }
}
let t = new Test('a');
//只有get没有set则视为readonly
//t.name = 'a';
export {};