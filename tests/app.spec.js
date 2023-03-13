const { describe, it } = require('mocha')
const { expect } = require('chai')
const { Dino } = require('../app')


describe('Dino constructor function tests', () => {
    it('created object should be instance of Dino since was create from Dino constructor', () => {
        const dino = new Dino()
        expect(dino).to.be.instanceOf(Dino)
    })
})