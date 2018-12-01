var DBObject = (function () {
    function DBObject(id, name, action, age) {
        if (age === void 0) { age = 10; }
        this.id = id;
        this.name = name;
        this.action = action;
        this.age = age;
    }
    return DBObject;
}());
var DB = (function () {
    function DB() {
    }
    DB.prototype.open = function (dbname) {
        console.log("open:" + dbname);
    };
    DB.prototype.add = function (data) {
        console.log('add', data);
        return true;
    };
    DB.prototype.update = function (data) {
        console.log('update', data);
        return true;
    };
    DB.prototype.del = function (id) {
        console.log('del', id);
        return true;
    };
    return DB;
}());
/**
 * DIP
 *   业务逻辑与数据库都依赖数据库接口
 *   这样当换数据库时则数据库实体根据已有的接口开发 不需要对业务逻辑进行操作
 *   从而实现业务逻辑与数据库的分离
 *   传入的参数若为复杂对象 则也应DIP
 *   这样从写数据库逻辑时参数也可以根据接口开发
 * */
function manager() {
    var db = new DB();
    db.open('a');
    var data = new DBObject('0001', 'gjj', 'tb', 31);
    db.add(data);
    db.update(data);
    db.del('0001');
}
