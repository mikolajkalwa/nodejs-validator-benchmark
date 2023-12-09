import yup from 'yup'
import validator from 'validator'

// NOTE: seems like yup itself don't support validation ISO String date in strict mode
// https://github.com/jquense/yup/issues/1218

export const baseSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string(),
    last: yup.string()
  }),
  login: yup.object().shape({
    email: yup.string(),
    password: yup.string()
  }),
  organization_id: yup.string(),
  requested_at: yup.string()
})

export const detailsSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string().min(1).max(999),
    last: yup.string().min(1).max(999)
  }),
  login: yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(12).max(50)
  }),
  organization_id: yup.string().uuid(),
  requested_at: yup.string().test(validator.isISO8601)
})
