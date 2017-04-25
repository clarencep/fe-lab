require('regenerator-runtime/runtime')
const co = require('co')

const sleep = (time, value) => new Promise(resolve => {
    setTimeout(function(){
        resolve(value)
    }, time)
})

co(function*(){
    console.log('[0] a: %o, b: %o', a, b)
    var a = yield sleep(1000, 1)
    console.log('[1] a: %o, b: %o', a, b)

    throw new Error('aaaa')
    
    var b = yield sleep(100, 2)

    console.log('[2] a: %o, b: %o', a, b)

    return 123

}).catch(e => {
    console.error("Got error: ", e)
}).then(data => {
    console.log("Final data: ", data)
})


co(function*(){
    console.log('[0`] a: %o, b: %o', a, b)
    var a = yield sleep(1000, 1)
    console.log('[1`] a: %o, b: %o', a, b)
    
    var b = yield sleep(100, 2)

    console.log('[2`] a: %o, b: %o', a, b)

    return 123

}).catch(e => {
    console.error("`Got error: ", e)
}).then(data => {
    console.log("`Final data: ", data)
})