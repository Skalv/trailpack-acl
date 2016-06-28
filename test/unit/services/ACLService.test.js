'use strict'
/* global describe, it */
const assert = require('assert')

describe('ACLService', () => {
  it('should exist', () => {
    assert(global.app.api.services['ACLService'])
  })
})
