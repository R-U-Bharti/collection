function Curried() {

    // 1. Basic Currying Problem
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func(...args)
            } else {
                return function (...moreArgs) {
                    return curried(...args.concat(moreArgs))
                }
            }
        }
    }

    function multiply(a, b, c) {
        return a * b * c;
    }

    const curriedMultiply = curry(multiply);

    // Direct Solution
    // function curriedMultiply(a){
    //     return function(b){
    //         return function(c){
    //             return a * b * c;
    //         }
    //     }
    // }

    console.log(curriedMultiply(2)(3)(4)); // 24
    console.log(curriedMultiply(2, 3, 4)); // 24

    // 2. Currying a Function with Multiple Parameters
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func(...args);
            } else {
                return function (...moreArgs) {
                    return curried(...args.concat(moreArgs))
                }
            }
        }
    }

    function sumFun(a, b, c, d) {
        return a + b + c + d;
    }

    const curriedSum = curry(sumFun)

    console.log(curriedSum(1)(2)(3)(4)); // 10
    console.log(curriedSum(1, 2)(3, 4)); // 10

    // 3. Infinite Currying

    // Direct Solution
    // function sum(a){
    //     return function(b){
    //         if(!b){
    //             return a;
    //         } else {
    //             return sum(a+b)
    //         }
    //     }
    // }

    function infiniteCurry(func) {
        const next = (...args) => {
            return (...moreArgs) => {
                if (moreArgs.length == 0) {
                    return func(...args)
                }
                return next(...args, ...moreArgs)
            }
        }
        return next();
    }

    const sum = infiniteCurry((...nums) => nums.reduce((acc, num) => acc + num, 0));

    console.log(sum(1)(2)(3)(4)()); // 10
    console.log(sum(5)(10)(15)(20)()); // 50

    // 4. Curried Function with Partial Application
    function partial(func, ...fixedArgs) {
        return function (...remainingArgs) {
            return func(...fixedArgs, ...remainingArgs); // Combine fixed and remaining args
        };
    }

    // Example: Partial multiplication function
    function multiply(a, b, c) {
        return a * b * c;
    }

    const partialMultiply = partial(multiply, 2);
    console.log(partialMultiply(3, 4)); // 24

    //   5. Currying with Multiple Functions
    // Direct Solution
    // function compose(func1, func2){
    //     return function curried(...moreArgs){
    //         return (func1(func2(...moreArgs)))
    //         }
    //     }

    function compose(...func) {
        return function (value) {
            return func.reduceRight((acc, fun) => fun(acc), value)
        }
    }

    // Example: Compose multiple functions
    function add2(x) {
        return x + 2;
    }

    function multiplyBy3(x) {
        return x * 3;
    }

    const composedFunction = compose(add2, multiplyBy3);

    console.log(composedFunction(5));// (5 * 3) + 2 = 17

    // 6. Currying with Fixed Number of Arguments
    function curryN(func, n) {
        return function curried(...args) {
            if (args.length >= n) {
                return func(...args)
            } else {
                return (...moreArgs) => curried(...args, ...moreArgs)
            }
        }
    }

    function add(a, b, c) {
        return a + b + c;
    }

    const curriedAdd = curryN(add, 3);

    console.log(curriedAdd(1)(2)(3)); // 6
    console.log(curriedAdd(1, 2)(3)); // 6

    // 7. Currying a Function with Spread Arguments
    function curryWithSpread(func) {
        const next = (...args) => {
            return (...moreArgs) => {
                if (moreArgs.length == 0) {
                    return func(...args)
                }
                return next(...args.concat(moreArgs))
            }
        }
        return next()
    }

    const curriedSum2 = curryWithSpread((...nums) => nums.reduce((acc, num) => acc + num, 0));

    console.log(curriedSum2(1, 2)(3)(4)()); // 10
    console.log(curriedSum2(5)(10, 15)()); // 30

    // 8. Curried Function with Optional Arguments
    function curryOptional(func) {
        return function curried(...args) {
            return function (...moreArgs) {
                const allArgs = args.concat(moreArgs);

                if (moreArgs.length === 0) {
                    return func(...allArgs);
                }

                return curried(...allArgs);

            };
        };
    }

    function sum(a = 0, b = 0, c = 0) {
        return a + b + c;
    }

    const curriedSum3 = curryOptional(sum);

    console.log(curriedSum3(1)(2, 3)); // 6
    console.log(curriedSum3(1)(2)()); // 3 (since c defaults to 0)

    //   9. Currying with Context (this)
    function curryWithContext(func) {
        return function curried(...args) {
            return (...moreArgs) => {
                return func.apply(this, [...args, ...moreArgs])
            }
        }
    }

    // Example: Method that uses 'this'
    const obj = {
        name: 'Alice',
        greet(greeting, punctuation) {
            return `${greeting}, ${this.name}${punctuation}`;
        }
    };

    // Currying the 'greet' function
    const curriedGreet = curryWithContext(obj.greet);

    // Binding 'this' to 'obj' to preserve the context
    const boundGreet = curriedGreet.bind(obj);

    // Now we can call the curried version
    console.log(boundGreet('Hello')('!')); // Output: "Hello, Alice!"
    console.log(boundGreet('Hi')('!!!'));  // Output: "Hi, Alice!!!"

    return (<></>)
}

export default Curried;