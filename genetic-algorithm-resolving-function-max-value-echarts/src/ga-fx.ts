import {xrange, newArray, randint} from './utils'

const sin = Math.sin
const cos = Math.cos

type Range = {max: number, min: number}

export default class GA{
    length: number
    count: number
    population: number[]
    func: (number) => number
    range: Range

    constructor(func: (number) => number, range: Range, length: number, count: number){
        this.func = func
        this.range = range
        this.length = length
        this.count = count
        this.population = this.genPopulation(length, count)
    }

    evolve(retainRate: number = 0.2, randomSelectRate: number = 0.5, mutationRate: number = 0.01){
        let parents = this.selection(retainRate, randomSelectRate)
        this.crossover(parents)
        this.mutation(mutationRate)
    }

    genChromosome(length: number): number {
        let chromosome = 0

        for (let i of xrange(length)){
            chromosome |= (1 << i) * randint(0, 1)
        }

        return chromosome
    }

    genPopulation(length: number, count: number): number[]{
        return newArray(count, i => this.genChromosome(length))
    }

    fitness(chromosome: number): number{
        let x = this.decode(chromosome)
        return +this.func(x)
    }

    selection(retainRate: number, randomSelectRate: number){
        let graded = this.population
            .map(chromosome => (
                [this.fitness(chromosome), chromosome]
            ))
            .sort((a, b) => a[0] - b[0])
            .reverse()
            .map(x => x[1])
        
        let retainLength = Math.floor(graded.length * retainRate)
        let parents = graded.slice(0, retainLength)

        graded.slice(retainLength).forEach(chromosome => {
            if (Math.random() < randomSelectRate){
                parents.push(chromosome)
            }
        })

        return parents
    }

    crossover(parents: number[]){
        let children = []

        let targetCount = this.population.length - parents.length

        while (children.length < targetCount){
            let male = randint(0, parents.length - 1)
            let female = randint(0, parents.length - 1)

            if (male != female){
                let crossPos = randint(0, this.length)

                let mask = 0
                for (let i of xrange(crossPos)){
                    mask |= (1 << i)
                }

                male = parents[male]
                female = parents[female]

                let child = ((male & mask) | (female & ~mask)) & ((1 << this.length) - 1)
                children.push(child)
            }
        }

        this.population = parents.concat(children)
    }

    mutation(rate: number){
        for (let i of xrange(this.population.length)){
            if (Math.random() < rate){
                this.population[i] ^= 1 << (randint(0, this.length - 1))
            }
        }
    }

    decode(chromosome: number): number{
        return this.range.min + chromosome * (this.range.max - this.range.min) / ((1 << this.length) - 1)
    }

    result(): number {
        let maxGrade = -Infinity
        let maxGraded = 0

        this.population.forEach(chromosome => {
            let grade = this.fitness(chromosome)
            if (grade > maxGrade){
                maxGrade = grade
                maxGraded = chromosome
            }
        })

        return this.decode(maxGraded)
    }
}
