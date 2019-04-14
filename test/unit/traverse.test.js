const { expect } = require('chai')

const traverse = require('../../src')

describe('src/utils/traverse', () => {
  context('given a simple processor', () => {
    const files = []
    const processor = file => {
      files.push(file)
    }
    const expected = [
      'test/unit/fixtures/api/outer.js',
      'test/unit/fixtures/api/test/inner.js'
    ]

    before(() => {
      traverse('test/unit/fixtures/api', processor)
    })

    it('returned the expected files', () => {
      expect(files).to.deep.equal(expected)
    })
  })

  context('given no processor', () => {
    it('runs but does nothing', () => {
      expect(traverse('test/unit/fixtures/api')).to.be.undefined
    })
  })
})
