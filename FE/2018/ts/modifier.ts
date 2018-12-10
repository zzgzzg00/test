abstract class ARole {
    private _zname: string;
    public set zname(value: string) {
        this._zname = value;
    }
    public get zname():string {
        return this._zname;
    }
    constructor(
        public readonly name: string,
        protected role: 'z' | 'n',
        private age:number
    ) {

    }
    abstract show(): void;
    static showClass():string {
        return ARole.name;
    }
}

class Role extends ARole {
    show() {
        console.log(this.name, this.role);
    }
}
let g = new Role('gjj', 'n', 32);
g.name;
// g.name = 'lm';
g.show();
g.zname = 'yn';
Role.showClass();