import GA from './ga-fx'
import {xrange} from './utils'


const {abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log1p, log2, log10, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc} = Math

// main function: 

function runGaFunc(funcStr, range, length, count, evolves){
    let func = eval('(function(x){ return (' + funcStr + ') })')
    console.log("GA begin at " + +new Date())
    let ga = new GA(func, range, length, count)

    for (let x of xrange(evolves)){
        ga.evolve()
    }


    console.log("GA end at " + +new Date())

    let result = ga.result()
    console.log(result)

    return result
}

runGaFunc('x + 10 * sin(5 * x) + 7 * cos(4 * x)', {min: 0, max: 9}, 17, 300, 200)


