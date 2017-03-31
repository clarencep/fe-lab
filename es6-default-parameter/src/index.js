
function f(x = 100){
    console.log('            f(x=100): typeof x: %s, x: %o', typeof x, x)
}


function g(x){
    x = x || 100
    console.log('g(x){ x = x || 100 }: typeof x: %s, x: %o', typeof x, x)
}


console.log("\n=========== No paramter: ============")
f()
g()


console.log("\n=========== x = 0 ============")
f(0)
g(0)

console.log("\n=========== x = undefined ============")
f(undefined)
g(undefined)

console.log("\n=========== x = null ============")
f(null)
g(null)

console.log("\n=========== x = '' ============")
f('')
g('')

console.log("\n=========== x = '0' ============")
f('0')
g('0')

console.log("\n=========== x = 1 ============")
f(1)
g(1)

console.log("\n=========== x = [] ============")
f([])
g([])

console.log("\n=========== x = {} ============")
f({})
g({})

