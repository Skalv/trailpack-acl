'use strict'

const Service = require('trails-service')
const _       = require('lodash')

/**
 * @module ACLService
 * @description Service for ACL
 */
module.exports = class ACLService extends Service {

  getResourceList() {
    return this.app.config.acl.resources
  }

  getUserRole(userId) {
    return this.app.orm.User.findOne({
      where: {id: userId},
      include: [{
        model: this.app.orm.Role,
      }]
    })
  }
}
