'use strict'

const Policy = require('trails-policy')
const _      = require('lodash')

/**
 * @module AclPolicy
 * @description Access control polocy
 */
module.exports = class AclPolicy extends Policy {
  isAllowed(req, res, next) {
    this.app.services.ACLService.getUserRole(req.user.id).then((user)=> {
      const resource = _.find(
        this.app.config.acl.resources,
        {'path': req.path, "method": req.method}
      )
      const userRole = user.toJSON()
      const rolesId = _.map(userRole.Roles, "id")
      this.app.orm.Permission.findOne({
        where: {
          "roles": {$in: rolesId},
          "resource": resource.name
        }
      }).then((permission) => {
        if (permission) {
          next()
        } else {
          res.sendStatus(403)
        }
      })
    })
  }
}
