'use strict'

const Trailpack = require('trailpack')
const _         = require('lodash')
const lib       = require('./lib')

module.exports = class AclTrailpack extends Trailpack {

  /**
   * Sequelize, express4 and trailpack-passport is required
   */
  validate () {
    // Check express4
    if (!_.includes(_.keys(this.app.packs), 'express4') && !_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('This trailpack work only with express.'))
    }

    // Check Sequelize
    if (this.app.config.database.orm !== 'sequelize' && !_.includes(_.keys(this.app.packs), 'sequelize')) {
      return Promise.reject(new Error('This trailpack work with Sequelize ORM'))
    }

    // Check trailpack-passport
    if (!_.includes(_.keys(this.app.packs), 'passport')) {
      return Promise.reject(new Error('This trailpack work with trailpack-passport'))
    }

    return Promise.all([
      lib.Validator.validateAclConfig(this.app.config.acl)
    ])
  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
