namespace NN {
    interface Zhu  {
        command: (command: string) => void;
    }
    export interface Gou {
        action: (command) => void;
    }
    export class Hy implements Zhu {
        command(command) {
            console.log(command);
        }
    }
    export class Gjj implements Gou {
        action(command) {
            console.warn(command);
        }
    }
}

const hy: NN.Hy = new NN.Hy();
const gjj: NN.Gou = new NN.Gjj();