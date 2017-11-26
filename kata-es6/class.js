/**
 * Created by zhigang.zhang on 17-5-6.
 */
/**
 * 通过setter/getter实现
 *  静态属性
 *      static get xx(){return 1}
 *  属性为箭头函数以实现this指向本对象
 *      get xx(){return ()=>this.name}
 *  通过[name]设置name值的属性
 *      get [name](){return 1}
 * */
/**
 * 继承包括多重继承的子类实例instanceof父类为true
 * */
/**
 * 通过
 *      BaseClass.isPorpertyOf(SubClass)
 *      Object.getPropertyOf(SubClass)==BaseClass
 * 判断父子关系
 * */
/**
 * 通过
 *      class SunClass extends (createClass(params)){}
 * 实现动态继承
 * */
/**
 * 类/对象的属性/方法都可以通过
 *      [name]
 * 形式定义
 * */
/**
 * super可以看为父类的实例
 * */
/**
 * 多层继承
 *      实现模板/建造模式
 * */
/**
 * super.constructor
 * */

title('accessor');
{
    {
        class MyAccount {
            get balance() {
                return Infinity;
            }
        }
        equal(new MyAccount().balance, Infinity);
    }

    {
        class MyAccount {
            get balance() { return this.amount; }
            set balance(amount) { this.amount = amount; }
        }

        const account = new MyAccount();
        account.balance = 42;
        equal(account.balance, 42);
    }

    {
        const balance = 'yourMoney';
        class YourAccount {
            get [balance]() { return -Infinity; }
        }
        equal(new YourAccount().yourMoney, -Infinity);
    }

    {
        const propertyName = 'balance';
        class MyAccount {
            get [propertyName]() { return this.amount; }
            set [propertyName](amount) { this.amount = amount; }
        }

        const account = new MyAccount();
        account.balance = 42;
        equal(account.balance, 42);
    }
}

title('creation');
{
    {
        let TestClass=class{};
        const instance = new TestClass();
        equal(typeof instance, 'object');
    }

    {
        {class Inside {}}
        {class Inside {}}
        equal(typeof Inside, 'undefined');
    }

    {
        class User {
            constructor(id) {
                this.id=id;
            }
        }

        const user = new User(42);
        equal(user.id, 42);
    }

    {
        class User {
            writesTests(){
                return false;
            }
        }

        const notATester = new User();
        equal(notATester.writesTests(), false);
    }

    {
        class User {
            wroteATest() { this.everWroteATest = true; }
            isLazy() { return !this.everWroteATest; }
        }

        const tester = new User();
        equal(tester.isLazy(), true);
        tester.wroteATest();
        equal(tester.isLazy(), false);
    }

    {
        const classType = typeof class {};
        equal(classType, 'function');
    }
}

title('extends');
{
    {
        let A=class{};
        equal(new A() instanceof Object, true);
    }

    {
        class A {}
        class B extends A{}
        equal(new B() instanceof A, true);
        equal(new B() instanceof Object, true);
    }

    /*{
        class NullClass extends null {}
        let nullInstance = new NullClass();
        equal(nullInstance instanceof Object, false);
    }*/

    {
        let A=class {};
        class B extends A {}
        equal(new B() instanceof A, true);
    }

    {
        class A {}
        class B extends A{};
        class C extends B {}
        let instance = new C();
        equal(instance instanceof A, true);
    }
}

title('more-extends');
{
    {
        let A=class{};
        class B extends A {}
        equal(new B() instanceof A, true);
    }

    {
        class A {}
        class B extends A {}
        const isIt = A.isPrototypeOf(B);
        equal(isIt, true);
        const proto = B.prototype;
        equal(A.prototype.isPrototypeOf(proto), true);
    }

    {
        let A;
        class B extends (A = class{}) {}
        equal(new B() instanceof A, true);
    }

    {
        const returnParent = (beNull) => beNull ? null : class {};
        class B extends (returnParent(1)) {}
        equal(Object.getPrototypeOf(B.prototype), null);
    }
}

title('static');
{
    {
        class IntegrationTest {}
        class UnitTest {}
        {
            class TestFactory {
                static makeTest() { return new UnitTest(); }
            }
            ok(TestFactory.makeTest() instanceof UnitTest);
        }
        {
            const methodName = 'makeTest';
            class TestFactory {
                static [methodName]() { return new UnitTest(); }
            }
            ok(TestFactory.makeTest() instanceof UnitTest);
        }
    }

    {
        class UnitTest {
            static get testType() { return 'unit'; }
        }
        equal(UnitTest.testType, 'unit');

        const type = 'test' + 'Type';
        class IntegrationTest {
            static get [type]() { return 'integration'; }
        }
        ok('testType' in IntegrationTest);
        equal(IntegrationTest.testType, 'integration');
    }
}

title('super in constructor');
{
    {
        class A {constructor() { this.levels = 1; }}
        class B extends A{
            constructor() {
                super();
                this.levels++;
            }
        }
        equal(new B().levels, 2);
    }

    {
        class A {constructor(startValue=1, addTo=1) { this.counter = startValue + addTo; }}
        class B extends A {
            constructor(...args) {
                super(...args);
                this.counter++;
            }
        }
        equal(new B(42, 2).counter, 45);
    }

    {
        class A {inc() { this.countUp = 1; }}
        class B extends A {
            inc() {
                this.countUp = 2;
                super.inc();
                return this.countUp;
            }
        }
        equal(new B().inc(), 1);
    }

    {
        class A extends (class{}) {
            constructor() {
                super();
                this.isTop = !!super.constructor;
            }
        }
        equal(new A().isTop, true);
    }
}

title('super in method');
{
    {
        class A {hasSuper() { return true; }}
        class B extends A {hasSuper() { return super.hasSuper(); }}
        equal(new B().hasSuper(), true);
    }

    {
        class A {hasSuper() { return true; }}
        class B extends A {hasSuper() { return undefined; }}
        equal(new B().hasSuper(), void 0);
    }

    {
        class A {iAmSuper() { return this.youAreSuper; }}
        class B extends A {constructor() { super(); this.youAreSuper = true; } }
        class C extends B {
            iAmSuper() {
                return super.iAmSuper();
            }
        }
        equal(new C().iAmSuper(), true);
    }

    {
        class A {}
        class B extends A {getMethod() { return super.constructor; }}
        equal(new B().getMethod(), A);
    }
}