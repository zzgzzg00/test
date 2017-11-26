/**
 * Created by zhigang.zhang on 17-9-15.
 */
function test(){
    console.log('test');
}
var a=1;
window.setTimeout(()=>a=10,2000);
export {test,a};