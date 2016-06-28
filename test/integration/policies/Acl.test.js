'use strict'
/* global describe, it */

const assert = require('assert')

describe('Acl', () => {
  it('should exist', () => {
    assert(global.app.api.policies['Acl'])
  })
})
