const { expect } = require('chai')

const constants = require('../../src/constants')

describe('src/constants', () => {
  it('has the constant ERROR_BUSY', () => {
    expect(constants).to.have.property('ERROR_BUSY', 'EBUSY')
  })

  it('has the constant ERROR_NOT_DIR', () => {
    expect(constants).to.have.property('ERROR_NOT_DIR', 'ENOTDIR')
  })
})
