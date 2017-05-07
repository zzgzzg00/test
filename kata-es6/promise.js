/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 *Promise.reject需catch 否则会抛出错误
 * then抛出的错误如果后边有catch则会被catch捕获
 * */
function done(err){
    if(err){
        throw err;
    }
}
title('api');
{
    {
        const param = ()=>({});
        new Promise(param);
    }
    {
        const param = (resolve) => { resolve(); };
        new Promise(param);
    }
    {
        Promise.reject('all fine').catch(function(){});
    }
    {
        const promise = new Promise((resolve,reject) => { reject(); });
        promise
            .then(() => done(new Error('The promise is expected to be rejected.')))
            .catch(() => done());
    }
    {
        const promise = Promise.resolve();
        promise
            .then(() => done(new Error('The promise is expected to be rejected.')))
            .catch(() => done());
    }
    const resolvingPromise = Promise.resolve(1);
    const rejectingPromise = Promise.reject(0);
    {
        Promise.all([resolvingPromise, rejectingPromise, resolvingPromise])
            .catch(data=>equal(data,0))
        Promise.all([resolvingPromise])
            .then(data=>deepEqual(data,[1]))
    }
    {
        Promise.race([resolvingPromise])
            .then((data) => equal(data,1));
    }
    {
        Promise.race([rejectingPromise, resolvingPromise])
            .catch(data=>equal(data,0));
    }
}

title('basic');
{
    {
        const expectedType = 'function';
        equal(typeof Promise, expectedType);
    }
    {
        let promise = new Promise((resolve) => {
            resolve();
        });

        promise
            .then(() => done())
            .catch(() => done(new Error('The promise is expected to resolve.')));
    }

    {
        let promise = new Promise((resolve) => {
            resolve(42);
        });
        promise
            .then(value => {equal(value, 42); done(); })
            .catch(() => done(new Error('The promise is expected to resolve with 42!')));
    }

    {
        let promise = new Promise((resolve,reject) => {
            reject();
        });

        promise
            .then(() => done(new Error('The promise is expected to be rejected.')))
            .catch(() => done());
    }

    {
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 100);
        });

        promise
            .then(() => done())
            .catch(() => done(new Error('The promise is expected to resolve.')));
    }

    {
        let promise = new Promise((resolve,reject) => {
            setTimeout(() => reject(), 100);
        });

        promise
            .then(() => done(new Error('The promise is expected to be rejected.')))
            .catch(() => done());
    }
}

title('catch');
{
    {
        const p = Promise.resolve();
        equal(typeof p.catch, 'function');
    }

    {
        const promise = Promise.reject();
        promise
            .then(() => { done('Should not be called!'); })
            .catch(done);
    }

    {
        const p = Promise.reject('rejection');
        p.catch(reason => {
            equal(reason, 'rejection');
        });
    }
    {
        const p = Promise.reject('1');
        const p1 = p
            .catch(reason => `${reason} AND 2`)
            .catch(reason => `${reason} AND 3`)
            .then(result =>
                equal(result, '1 AND 2')
            );
    }

    {
        const p = Promise.reject('1');
        const p1 = p
            .catch(reason => { throw Error(`${reason} AND 2`) })
            .catch(err => { return `${err.message} AND 3` })
            .catch(err => `${err} but NOT THIS`)
            .then(result =>
                equal(result, '1 AND 2 AND 3')
            );
        }
}

title('chaining-then');
{
    const beNice = () => { throw new Error('I am nice') };
    Promise.resolve()
        .then(beNice)
        .then(()=>{},niceMessage => equal(niceMessage.message, 'I am nice'));

    const removeMultipleSpaces = string => string.replace(/\s+/g, ' ');

    {
        const wordsPromise = Promise.resolve('one   space     between each     word');
        wordsPromise
            .then(string => removeMultipleSpaces(string))
            .then(actual => {equal(actual, 'one space between each word')});
    }

    const appendPeriod = string => `${string}.`;

    {
        const wordsPromise = Promise.resolve('Sentence without       an end');
        wordsPromise
            .then(removeMultipleSpaces)
            .then(appendPeriod)
            .then(actual => {equal(actual, 'Sentence without an end.')});
    }

const trim = string => string.replace(/^\s+/, '').replace(/\s+$/, '');

    {
        const wordsPromise = Promise.resolve('Sentence without       an end ');
        wordsPromise
            .then(trim)
            .then(appendPeriod)
            .then(removeMultipleSpaces)
            .then(actual => {equal(actual, 'Sentence without an end.')});
    }

    const asyncUpperCaseStart = (string, onDone) => {
        const format = () => onDone(string[0].toUpperCase() + string.substr(1));
        setTimeout(format, 100);
    };

    {
        const wordsPromise = Promise.resolve('sentence without an end');
        wordsPromise
            .then(string => new Promise(resolve => asyncUpperCaseStart(string,resolve)))
            .then(string => new Promise(resolve => setTimeout(() => resolve(appendPeriod(string)), 100)))
            .then(actual => {equal(actual, 'Sentence without an end.')});
    }

    {
        const wordsPromise = Promise.resolve('trailing space   ');
        wordsPromise
            .then(string => new Promise(resolve => asyncUpperCaseStart(string, resolve)))
            .then(string => new Promise(resolve => setTimeout(() => resolve(trim(string)), 100)))
            .then(string => new Promise(resolve => setTimeout(() => resolve(appendPeriod(string)), 100)))
            .then(actual => {equal(actual, 'Trailing space.')});
    }
}

title('creation');
{
    {
        class MyPromise extends Promise{};
        const promise = new MyPromise(resolve => resolve());
        promise
            .then(() => log(1))
            .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
    }

    {
        const promise = Promise.all([
            new Promise(resolve => resolve(1)),
            new Promise(resolve => resolve(2)),
            new Promise(resolve => resolve(3))
        ]);
        promise
            .then(value => { deepEqual(value, [1, 2,3]); done(); })
            .catch(e => done(new Error(e)));
    }
    {
        const promise = Promise.all([
            new Promise(resolve => resolve(1)),
            Promise.reject()
        ]);
        promise
            .then(() => done(new NotRejectedError()))
            .catch(() => done());
    }
    {
        const lateRejectedPromise = new Promise((resolve, reject) => setTimeout(reject, 100));
        const earlyResolvingPromise = new Promise(resolve => resolve('1st :)'));
        const promise = Promise.race([earlyResolvingPromise,lateRejectedPromise]);
        promise
            .then(value => {deepEqual(value, '1st :)'); done(); })
            .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
    }
    {
        const earlyRejectedPromise = new Promise((resolve, reject) => reject('I am a rejector'));
        const lateResolvingPromise = new Promise(resolve => setTimeout(resolve, 10));
        const promise = Promise.race([earlyRejectedPromise, lateResolvingPromise]);
        promise
            .then(() => done(new NotRejectedError()))
            .catch(value => {equal(value, 'I am a rejector'); done(); })
            .catch(done);
    }
}