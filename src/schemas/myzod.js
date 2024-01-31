import validator from 'validator'
import myzod from 'myzod'

export const baseSchema = myzod.object({
  name: myzod.object({
    first: myzod.string(),
    last: myzod.string()
  }),
  login: myzod.object({
    email: myzod.string(),
    password: myzod.string()
  }),
  organization_id: myzod.string(),
  requested_at: myzod.string()
})

export const detailsSchema = myzod.object({
  name: myzod.object({
    first: myzod.string().min(1).max(999),
    last: myzod.string().min(1).max(999)
  }),
  login: myzod.object({
    email: myzod.string().withPredicate(validator.isEmail),
    password: myzod.string().min(12).max(50)
  }),
  organization_id: myzod.string().withPredicate(validator.isUUID),
  requested_at: myzod.string().withPredicate(validator.isISO8601)
})
