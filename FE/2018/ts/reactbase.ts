interface Props {
    name: string;
    age: number;
    sex: 1 | 2;
    role: 'n' | 'z';
}

class Component<T>{
    constructor(public props: T) {

    }
}

class Test extends Component<Props>{
    props: Props;
    constructor(props:Props) {
        super(props);
    }
}

let props1:Props = {
    name: 'gjj',
    age: 32,
    sex: 2,
    role:'n'
}

let props2 = {
    name: 'hy',
    sex:3,
    age: 24,
    role:'z'
}

let gjj = new Test(props1);
// let hy = new Test(props2);
