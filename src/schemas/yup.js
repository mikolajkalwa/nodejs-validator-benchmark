import yup from 'yup'

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
  requested_at: yup.date()
})
