interface DBObjectInterface{
    id:string;
    name:string;
    age?:number;
    action:string;
}
interface DBInterface{
    open:(dbname:string)=>void;
    add:(data:DBObjectInterface)=>boolean;
    update:(data:DBObjectInterface)=>boolean;
    del:(id:string)=>boolean;
}

class DBObject implements DBObjectInterface{
    constructor(public id:string,public name:string,public action:string,public age:number=10){

    }
}
class DB implements DBInterface{
    open(dbname:string){
        console.log(`open:${dbname}`);
    }
    add(data:DBObjectInterface){
        console.log('add',data);
        return true;
    }
    update(data:DBObjectInterface){
        console.log('update',data);
        return true;
    }
    del(id:string){
        console.log('del',id);
        return true;
    }
}

/**
 * DIP
 *   业务逻辑与数据库都依赖数据库接口
 *   这样当换数据库时则数据库实体根据已有的接口开发 不需要对业务逻辑进行操作
 *   从而实现业务逻辑与数据库的分离
 *   传入的参数若为复杂对象 则也应DIP
 *   这样从写数据库逻辑时参数也可以根据接口开发
 * */
function manager(){
    const db:DBInterface=new DB();
    db.open('a');
    const data:DBObjectInterface=new DBObject('0001','gjj','tb',31);
    db.add(data);
    db.update(data);
    db.del('0001');
}