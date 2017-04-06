import GA from './ga-fx'
import {xrange} from './utils'


const {abs, acos, acosh, asin, asinh, atan, atan2, atanh, cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot, imul, log, log1p, log2, log10, max, min, pow, random, round, sign, sin, sinh, sqrt, tan, tanh, trunc} = Math

// main function: 

function runGaFunc(funcStr, range, length, count, evolves){
    let func = eval('(function(x){ return (' + funcStr + ') })')
    let ga = new GA(func, range, length, count)

    for (let x of xrange(evolves)){
        ga.evolve()
    }


    let result = ga.result()

    return result
}

function getElValById(id){
    let el = document.getElementById(id)
    return el && el.value
}

document.getElementById('go').addEventListener('click', function(e){
    e.preventDefault()
    e.stopPropagation()
    let func = getElValById('func'),
        range = {min: +getElValById('min'), max: +getElValById('max')},
        length = +getElValById('length'),
        count = +getElValById('count'),
        evolves = +getElValById('evolves')

    let start = +new Date()
    let result = runGaFunc(
        func,
        range,
        length,
        count,
        evolves
    )

    let historyItem = document.createElement('div')
    historyItem.className = 'history-item'
    historyItem.innerText = `
${(((+new Date()) - start) / 1000).toFixed(3)}s 完成：
函数：f(x) = ${func}
求解范围：${range.min} ~ ${range.max}
求解精度：${length}
种群大小：${count}
进化轮数：${evolves}
结果：${result}
    `
    document.getElementById('histories').insertAdjacentElement('afterbegin', historyItem)
})


