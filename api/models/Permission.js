'use strict'

const Model = require('trails-model')

/**
 * @module Permission
 * @description Permission model for ACL
 */
module.exports = class Permission extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        paranoid: true,
        classMethods: {
          associate: (models) => {
            // models.Permission.hasOne(models.Role, {
            //  foreignKey: 'roleId'
            // })
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    return {
      resource: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      }
    }
  }
}
