import Joi from 'joi'

export const create = Joi.object().keys({
  email: Joi.string().required()
})

export const logIn = Joi.object().keys({
  token: Joi.string().required(),
  email: Joi.string().required()
})

export const useragent = Joi.object().keys({
  browser: Joi.string
})
