import sub from './sub1.js';
sub();
document.body.onclick=function () {
    import('./test.js');
}