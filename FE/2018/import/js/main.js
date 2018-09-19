import sub from './sub1.js';
sub();
// alert(a);
// setTimeout(alert,2000,a)
document.body.onclick=function () {
    import('./test.js');
}