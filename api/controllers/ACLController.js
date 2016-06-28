'use strict'

const Controller = require('trails-controller')
const _          = require('lodash')

/**
 * @module ACLController
 * @description Generated Trails.js Controller.
 */
module.exports = class ACLController extends Controller {
  /**
   * User <=> Role association
   */

   /**
    * Get user and his role(s)
    * @param userId the user Id
    * @return userRole {json}
    */
  getUserRole(req, res) {
    let userId = req.params.id || req.body.userId
    this.app.services.ACLService.getUserRole(userId).then((user)=> {
      res.json(user)
    })
  }
  /**
   * Add role(s) to user
   * @param userId the user Id
   * @param roleId {int|String|Array} id(s) of role who want add to user
   * @return userRole {json}
   */
  addUserRole(req, res) {
    this.app.orm.User.findOne({where: {id: req.body.userId}}).then((user)=> {
      let rolesId = (_.isArray(req.body.roleId))
        ? req.body.roleId
        : _.castArray(req.body.roleId)

      user.addRoles(rolesId).then((tutu)=> {
        // res.json(tutu)
        this.getUserRole(req, res)
      })
    })
  }
  /**
   * Remove role(s) from user
   * @param userId the user Id
   * @param roleId {int|String|Array} id(s) of role who want remove from user
   * @return userRole {json}
   */
  removeUserRole(req, res) {
    this.app.orm.User.findOne({where: {id: req.body.userId}}).then((user)=> {
      let rolesId = (_.isArray(req.body.roleId))
        ? req.body.roleId
        : _.castArray(req.body.roleId)

      user.removeRole(rolesId)
      this.getUserRole(req, res)
    })
  }

  /**
   * Allow, deny access to resources
   */

  /**
   * Allow role to access at resource
   * @param roleId
   * @param resource the name of the resource
   * @param methods {Array} list of methods who permit role to use on resource
   * @return permission {json}
   */
  allow(req, res) {
    this.app.orm.Role.findOne({
      where: {id: req.body.roleId},
      include: [{
        model: this.app.orm.Permission,
        where: {resource: req.body.resource}
      }]
    }).then((permissionRole) => {
      if (!permissionRole) {
        // No permission found create it
        this.app.orm.Role.findOne({where: {id: req.body.roleId}}).then((role)=>{
          this.app.orm.Permission.create({
            resource: req.body.resource,
            methods: req.body.methods
          }).then((permission) => {
            role.addPermission(permission).then((role) => {
              res.json([role, permission])
            })
          })
        })
      } else {
        return res.status(500).send("Permission already exist")
      }
    })
  }

  /**
   * Deny role to access at resource
   * @param roleId
   * @param resource the name of the resource
   * @param methods {Array} list of methods who permit role to use on resource
   * @return permission {json}
   */
  deny(req, res) {
    this.app.orm.Role.findOne({
      where: {id: req.body.roleId},
      include: [{
        model: this.app.orm.Permission,
        where: {resource: req.body.resource}
      }]
    }).then((permissionRole) => {
      if (permissionRole) {
        permissionRole.removePermission(permissionRole.Permissions[0])
        .then(() => {
          this.app.orm.Permission.destroy({
            where: {id: permissionRole.Permissions[0].id}
          }).then((nbDelete) => {
            res.json({success: true})
          })
        })
      } else {
        return res.status(500).send("no Permission found")
      }
    })
  }

  /**
   * Return list of resource who need permission to access
   */
  getResources(req, res) {
    res.json(this.app.services.ACLService.getResourceList())
  }

}
