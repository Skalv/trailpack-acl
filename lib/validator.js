const joi     = require("joi")
const schemas = require('./schemas')

module.exports = {
  validateAclConfig(config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.acl, (err, value) => {
        if (err) return reject(new TypeError('config.acl: ' + err))

        return resolve(value)
      })
    })
  }
}
