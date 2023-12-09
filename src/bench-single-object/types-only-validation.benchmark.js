import cronometro from 'cronometro'
import { user } from './user.js'
import * as ajv from '../schemas/ajv.js'
import * as joi from '../schemas/joi.js'
import * as myzod from '../schemas/myzod.js'
import * as yup from '../schemas/yup.js'
import * as zod from '../schemas/zod.js'

cronometro({
  ajv: function () {
    ajv.baseSchema(user)
  },
  joi: function () {
    joi.baseSchema.validate(user)
  },
  myzod: function () {
    myzod.baseSchema.try(user)
  },
  yup: function () {
    yup.baseSchema.isValidSync(user, { strict: true })
  },
  zod: function () {
    zod.baseSchema.safeParse(user)
  }
}, {
  iterations: 10_000_000,
  errorThreshold: 0,
  warmup: true,
  print: {
    colors: false,
    compare: true,
    compareMode: 'base'
  }
}, (err, results) => {
  if (err) {
    throw err
  }
  console.log(JSON.stringify(results, null, 2))
})
