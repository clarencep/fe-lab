export function randint(min: number, max: number): number{
    return Math.round(Math.random() * (max -min))
}

export function *xrange(min: number, max?: number): IterableIterator<number>{
    if (typeof max === 'undefined'){
        max = min
        min = 0
    } else {
        min = min
        max = max
    }

    for (let i = min; i < max; i++){
        yield i
    }
}

type Generator<T> = (i: number) => T

export function newArray<T>(len: number, generate: Generator<T> = ((i: number) => null)): T[]
{
    let res = new Array(len)

    for (let i = 0; i < len; i++){
        res[i] = generate(i)
    }

    return res
}
