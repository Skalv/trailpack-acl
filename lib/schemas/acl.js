const joi = require('joi')

module.exports = joi.object().keys({
  resources: joi.array().items(
    joi.object().keys({
      name: joi.string().required(),
      path: joi.string().required(),
      method: joi.string().required(),
      description: joi.string().required()
    })
  )
})
