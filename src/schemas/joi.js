import Joi from 'joi'

export const baseSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi.string().required(),
    last: Joi.string().required()
  }).required(),
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }).required(),
  organization_id: Joi.string().required(),
  requested_at: Joi.string().required()
}).required()

export const detailsSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi.string().min(1).max(999).required(),
    last: Joi.string().min(1).max(999).required()
  }).required(),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(50).required()
  }).required(),
  organization_id: Joi.string().uuid().required(),
  requested_at: Joi.string().isoDate().required()
}).required()
