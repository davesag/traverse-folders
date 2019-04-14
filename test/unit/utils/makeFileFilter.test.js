const { expect } = require('chai')
const makeFileFilter = require('../../../src/utils/makeFileFilter')

describe('src/utils/makeFileFilter', () => {
  const input = ['.', 'test.js', 'something-else', 'good_times.js']

  context('given a string', () => {
    const filterInput = makeFileFilter('t.js', '.js')
    const expected = ['good_times.js']

    it('filters as expected', () => {
      expect(input.filter(filterInput)).to.deep.equal(expected)
    })
  })

  context('given a regex', () => {
    const filterInput = makeFileFilter(/^.*_.*$/i, '.js')
    const expected = ['test.js']

    it('filters as expected', () => {
      expect(input.filter(filterInput)).to.deep.equal(expected)
    })
  })

  context('given a function', () => {
    const filterInput = makeFileFilter(file => file === 'test.js', '.js')
    const expected = ['good_times.js']

    it('filters as expected', () => {
      expect(input.filter(filterInput)).to.deep.equal(expected)
    })
  })

  context('given something else', () => {
    const filterInput = makeFileFilter({ will: { not: 'work' } }, '.js')
    const expected = ['test.js', 'good_times.js']

    it('filters as expected', () => {
      expect(input.filter(filterInput)).to.deep.equal(expected)
    })
  })
})
