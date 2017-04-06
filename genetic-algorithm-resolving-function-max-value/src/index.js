import GA from './ga-fx'
import {xrange, newArray} from './utils'

import "./index.less"

import Chart from 'chart.js'

const {
    abs,
    acos,
    acosh,
    asin,
    asinh,
    atan,
    atan2,
    atanh,
    cbrt,
    ceil,
    clz32,
    cos,
    cosh,
    exp,
    expm1,
    floor,
    fround,
    hypot,
    imul,
    log,
    log1p,
    log2,
    log10,
    max,
    min,
    pow,
    random,
    round,
    sign,
    sin,
    sinh,
    sqrt,
    tan,
    tanh,
    trunc
} = Math

// main function:

function * runGaFunc(funcStr, range, length, count, evolves) {
    let func = eval('(function(x){ return (' + funcStr + ') })')
    let ga = new GA(func, range, length, count)

    for (let x of xrange(evolves)) {
        ga.evolve()

        yield ga.result()
    }
}

function getElValById(id) {
    let el = document.getElementById(id)
    return el && el.value
}

let $go = document.getElementById('go')
$go.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    let funcStr = getElValById('func'),
        calcFunc = eval('(function(x){ return (' + funcStr + ') })'),
        range = {
            min: + getElValById('min'),
            max: + getElValById('max')
        },
        length = +getElValById('length'),
        count = +getElValById('count'),
        evolves = +getElValById('evolves')

    let start = +new Date()

    let middleResults = []
    let result

    for (result of runGaFunc(funcStr, range, length, count, evolves)) {
        middleResults.push(result)
    }

    console.log("middleResults: ", middleResults)

    let historyItem = document.createElement('div')
    historyItem.className = 'history-item'
    historyItem.innerText = `
${ (((+ new Date()) - start) / 1000).toFixed(3)}s 完成：
函数：f(x) = ${func}
求解范围：${range.min} ~ ${range.max}
求解精度：${length}
种群大小：${count}
进化轮数：${evolves}
结果：${result}`

    document
        .getElementById('histories')
        .insertAdjacentElement('afterbegin', historyItem)

    let $funcChart = document.createElement('canvas')
    $funcChart.width = 600
    $funcChart.height = 400
    historyItem.appendChild($funcChart)

    let funcChart = new Chart($funcChart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'f(x) = ' + funcStr,
                    data: newArray(1000, i => {
                        let x = range.min + (range.max - range.min) * i / 1000.0
                        return {x: x, y: calcFunc(x)}
                    })
                }
            ]
        },
        options: {
            scales: {
                xAxes: [
                    {
                        type: 'linear',
                        position: 'bottom'
                    }
                ]
            }
        }
    })

    let $middleResultChart = document.createElement('canvas')
    $middleResultChart.width = 600
    $middleResultChart.height = 400
    historyItem.appendChild($middleResultChart)

    let middleResultChart = new Chart($middleResultChart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: '每次进化后的求解结果：',
                    data: middleResults.map((v, i) => ({
                        x: i + 1,
                        y: v
                    }))
                }
            ]
        },
        options: {
            scales: {
                xAxes: [
                    {
                        type: 'linear',
                        position: 'bottom'
                    }
                ]
            }
        }
    })
})

$go.dispatchEvent(new MouseEvent('click'))
