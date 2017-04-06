import GA from './ga-fx'
import {xrange, newArray} from './utils'

import "./index.less"

import echarts from 'echarts'

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

function * runGaFunc(funcStr, range, length, count, evolves, retainRate, randomSelectRate, mutationRate) {
    let func = eval('(function(x){ return (' + funcStr + ') })')
    let ga = new GA(func, range, length, count)

    for (let x of xrange(evolves)) {
        ga.evolve(retainRate, randomSelectRate, mutationRate)

        yield {
            value: ga.result(),
            population: ga
                .population
                .map(x => ga.decode(x))
        }
    }
}

function getElValById(id) {
    let el = document.getElementById(id)
    return el && el.value
}

let allECharts = []

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
        evolves = +getElValById('evolves'),
        retainRate = +getElValById('retainRate'),
        randomSelectRate = +getElValById('randomSelectRate'),
        mutationRate = +getElValById('mutationRate')

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
函数：f(x) = ${funcStr}
求解范围：${range.min} ~ ${range.max}
求解精度：${length}
种群大小：${count}
进化轮数：${evolves}
留存率: ${retainRate}
随机选择率：${randomSelectRate}
变异率：${mutationRate}
结果：${result.value}`

    document
        .getElementById('histories')
        .insertAdjacentElement('afterbegin', historyItem)

    let $funcChart = document.createElement('canvas')
    $funcChart.width = 800
    $funcChart.height = 600
    historyItem.appendChild($funcChart)

    let funcChart = echarts.init($funcChart)
    let funcDataSamplesCount = getElValById('funcDataSamplesCount')
    funcChart.setOption({
        title: {
            text: 'f(x) = ' + funcStr
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
        xAxis: {
            data: newArray(funcDataSamplesCount, i => range.min + (range.max - range.min) * i / funcDataSamplesCount)
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        dataZoom: [
            {
                startValue: range.min
            },
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'line',
                large: true,
                data: newArray(funcDataSamplesCount, i => calcFunc(range.min + (range.max - range.min) * i / funcDataSamplesCount))
            }
        ]
    })

    let $middleResultChart = document.createElement('canvas')
    $middleResultChart.width = 800
    $middleResultChart.height = 600
    historyItem.appendChild($middleResultChart)

    let middleResultChart = echarts.init($middleResultChart)
    middleResultChart.setOption({
        title: {
            text: '每次进化后的求解结果：'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {top: 10};
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
        xAxis: {
            data: middleResults.map((x, i) => i + 1)
        },
        yAxis: {
            splitLine: {
                show: true
            },
            min: range.min,
            max: range.max,
        },
        dataZoom: [
            {
                startValue: 1,
                xAxisIndex: 0,
            },
            {
                type: 'inside',
                xAxisIndex: 0,
            },
            {
                type: 'slider',
                yAxisIndex: 0,
            },
            {
                type: 'inside',
                yAxisIndex: 0,
            }
        ],
        series: [
            {
                name: "The fitest of each evolve",
                type: 'line',
                data: middleResults.map(x => x.value)
            },
            {
                name: "Population of each evolve",
                type: 'scatter',
                symbolSize: function(data){
                    return Math.sqrt(data[2])
                },
                large: true,
                data: middleResults.reduce((acc, v, x) => {
                    let counts = {}

                    v.population.forEach((dy, j) => {
                        counts[dy] = (counts[dy] || 0) + 1
                    })

                    for (let k in counts){
                        if (counts.hasOwnProperty(k)){
                            acc.push([x, k, counts[k]])
                        }
                    }

                    return acc
                }, [])
            }
        ]

    })

    allECharts.push(funcChart)
    allECharts.push(middleResultChart)
    refreshEChartsSizes([funcChart, middleResultChart])
})

$go.dispatchEvent(new MouseEvent('click'))


window.addEventListener('resize', function(){
    refreshEChartsSizes(allECharts)
})

function refreshEChartsSizes(echartsObjArr){
    let width = min(1200, max(window.innerWidth - 20, 600))
    let height = width / 2

    echartsObjArr.forEach(chart => chart.resize({width, height, silent: true}))
}

document.getElementById('loading').style = 'display:none'