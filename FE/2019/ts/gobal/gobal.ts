//相同的项目下let var const定义的变量是全局的 会被其他文件直接访问到
//应使用export import使用文件模块

//如果其他文件也有同样的声明则会报错
// let d:string='a';

//放入块级作用域
{
    let d:string='a';
}

//使用文件模块 当文件中包含export import时则启用了文件模块
//变量d将不能在该文件外使用 也就不会重复定义了
let s:string='s';
let d:string='d';
export {s};