function compose(...funs){
    return function addParams(param) {
        return funs.reduceRight((a,b)=>b(a),param);
    }
}

function curry(fun,len=fun.length){
    return function(...args) {
        if(args.length >= len){
            return fun(...args);
        }
        const arr = [...args];
        return function addParams(...params) {
            arr.push(...params);
            if (arr.length >= len) {
                return fun(...arr);
            }
            return addParams;
        }
    }
}
const trace=curry(function(tag,x){
        console.log(tag,x);
        return x;
    });

const map=curry(function (fun,elements){
    return elements.map(fun)
})

const split=curry(function (sign,str){
    return String.prototype.split.call(str,sign);
});

const join=curry(function(sign,elements){
    return elements.join(sign);
})

const toUpperCase=String.prototype.toUpperCase.call.bind(String.prototype.toUpperCase);
