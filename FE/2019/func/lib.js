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
            const newArr=[...arr,...params];
            if (newArr.length >= len) {
                return fun(...newArr);
            }
            return function appendParams(...newParams){
                return addParams(...params,...newParams);
            }
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

const prop=curry(function(key,obj){
    return obj[key];
})

const toUpperCase=String.prototype.toUpperCase.call.bind(String.prototype.toUpperCase);
