const { describe, it } = require('mocha')
const { expect } = require('chai')
const {
    Animal,
    Dinosaur,
    Human,
    Tile,
    convertInchesToFoot,
    convertFootToInches
} = require('../public/app.js')


describe('convertFootToInches tests', () => {
    it('result should be 0 since foot is undefined', () => {
        const foot = undefined
        const result = convertFootToInches(foot)
        expect(result).to.be.equal(0)
    })

    it('result should be 0 since foot is lower than zero', () => {
        const foot = -1
        const result = convertFootToInches(foot)
        expect(result).to.be.equal(0)
    })

    it('result should be 12 since foot is 1', () => {
        const foot = 1
        const result = convertFootToInches(foot)
        expect(result).to.be.equal(12)
    })
})

describe('convertInchesToFoot tests', () => {
    it('result should be 0 since inches is undefined', () => {
        const inches = undefined
        const result = convertInchesToFoot(inches)
        expect(result).to.be.equal(0)
    })

    it('result should be 0.0833333 since inches is 1', () => {
        const inches = 1
        const result = convertInchesToFoot(inches)
        expect(result).to.be.equal(0.0833333)
    })

    it('result should be 0 since inches is lower than zero', () => {
        const inches = -1
        const result = convertInchesToFoot(inches)
        expect(result).to.be.equal(0)
    })
})

describe('Animal constructor function tests', () => {
    it('created object should be instance of Animal since was create from Animal constructor', () => {
        const animal = new Animal()
        expect(animal).to.be.instanceOf(Animal)
    })

    it('getFact should be string since one or more facts are given on object construction', () => {
        const animal = new Animal("Species 1", ["some fact"], 0.123, 456, "carnivore")
        const fact = animal.getFact()
        expect(typeof fact).to.be.equal("string")
    })

    it('properties of Animal object should be undefined since no arguments has been provided to the constructor', () => {
        const animal = new Animal()
        expect(animal.species).to.be.undefined
        expect(animal.diet).to.be.undefined
        expect(animal.facts).to.be.undefined
        expect(animal.feet).to.be.equal(0)
        expect(animal.inches).to.be.undefined
        expect(animal.lbs).to.be.undefined
    })

    it('getFact should be undefined since no facts are given on object construction', () => {
        const animal = new Animal()
        expect(animal.getFact()).to.be.undefined
    })
})

describe('Dinosaur constructor function tests', () => {
    it('created object should be instance of Dinosaur since was create from Dinosaur constructor', () => {
        const dinosaur = new Dinosaur()
        expect(dinosaur).to.be.instanceOf(Animal)
        expect(dinosaur).to.be.instanceOf(Dinosaur)
    })

    it('properties of Dinosaur object should be undefined since no arguments has been provided to the constructor', () => {
        const dinosaur = new Dinosaur()
        expect(dinosaur.species).to.be.undefined
        expect(dinosaur.diet).to.be.undefined
        expect(dinosaur.facts).to.be.undefined
        expect(dinosaur.feet).to.be.equal(0)
        expect(dinosaur.inches).to.be.undefined
        expect(dinosaur.lbs).to.be.undefined
    })

    it('properties of Dinosaur object should not be undefined since arguments has been provided to the constructor', () => {
        const dinosaur = new Dinosaur("Species 1", ["some fact", "some fact 2"], 0.123, 456, "carnivore")
        expect(dinosaur.species).to.be.equal("Species 1")
        expect(dinosaur.diet).to.be.equal("carnivore")
        expect(dinosaur.facts).to.be.instanceOf(Array)
        expect(dinosaur.feet).to.be.equal(0.0102499959)
        expect(dinosaur.inches).to.be.equal(0.123)
        expect(dinosaur.lbs).to.be.equal(456)
    })
})

describe('Human constructor function tests', () => {
    it('created object should be instance of Human since was create from Human constructor', () => {
        const human = new Human()
        expect(human).to.be.instanceOf(Animal)
        expect(human).to.be.instanceOf(Human)
    })

    it('properties of Human object should be undefined since no arguments has been provided to the constructor', () => {
        const human = new Human()
        expect(human.species).to.be.undefined
        expect(human.diet).to.be.undefined
        expect(human.facts).to.be.undefined
        expect(human.feet).to.be.equal(0)
        expect(human.inches).to.be.undefined
        expect(human.lbs).to.be.undefined
    })

    it('properties of Human object should not be undefined since arguments has been provided to the constructor', () => {
        const human = new Human("Homo Sapiens", ["some fact", "some fact 2"], 0.123, 456, "carnivore")
        expect(human.species).to.be.equal("Homo Sapiens")
        expect(human.diet).to.be.equal("carnivore")
        expect(human.facts).to.be.instanceOf(Array)
        expect(human.feet).to.be.equal(0.0102499959)
        expect(human.inches).to.be.equal(0.123)
        expect(human.lbs).to.be.equal(456)
    })
})

describe('Tile constructor function tests', () => {
    it('created object should be instance of Tile since was create from Tile constructor', () => {
        const tile = new Tile()
        expect(tile).to.be.instanceOf(Tile)
    })

    it('properties of Tile object should be undefined since no arguments has been provided to the constructor', () => {
        const tile = new Tile()
        expect(tile.color).to.be.undefined
        expect(tile.facts).to.be.undefined
        expect(tile.imageUrl).to.be.undefined
    })

    it('comparisons of Tile object should be an empty array since no arguments has been provided to the constructor', () => {
        const tile = new Tile()
        expect(tile.comparisons).to.be.empty
    })
})