import Joi from 'joi'

export const verify = Joi.object().keys({
  jwt: Joi.string().required()
})
