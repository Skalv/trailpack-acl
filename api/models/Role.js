'use strict'

const Model = require('trails-model')

/**
 * @module Role
 * @description Role model for acl
 */
module.exports = class Role extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        paranoid: true,
        classMethods: {
          associate: (models) => {
            models.Role.belongsToMany(models.User, {
              through: 'userRole'
            })

            models.User.belongsToMany(models.Role, {
              through: 'userRole'
            })

            models.Role.hasMany(models.Permission, {
              foreignKey: 'roles'
            })
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
  }
}
