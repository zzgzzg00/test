console.log('test class');
class O {
    constructor () {
        this.initData();
    }
    initData () {}
    set x (value) { console.log(value); this._x = 1;}
}
class C extends O {
    static s=1;
    id=10;
    x=20;
    a= 1;
    constructor () {
        console.log(' c c');
        super();
    }
    initData () {
        console.log('initData', this.constructor == C2);
        this.s = {s: 1};
        this.id = {id: 1};
        this.x = 'x';
    }
}
class C2 extends C {
    constructor (ques = {}, parent) {
        super(ques, parent);
        this.init();
    }
    init () {
        console.log('c2 init', JSON.stringify(this), this.s, this === C2);
    }
}
var c = new C2();
console.log('ccc', c);
