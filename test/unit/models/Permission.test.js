'use strict'
/* global describe, it */
const assert = require('assert')

describe('Permission Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Permission'])
  })
})
