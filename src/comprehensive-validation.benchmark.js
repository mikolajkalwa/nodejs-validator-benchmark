import cronometro from 'cronometro'
import { user } from './fixture.js'
import * as ajv from './schemas/ajv.js'
import * as joi from './schemas/joi.js'
import * as myzod from './schemas/myzod.js'
import * as yup from './schemas/yup.js'
import * as zod from './schemas/zod.js'

cronometro({
  ajv: function () {
    ajv.detailsSchema(user)
  },
  joi: function () {
    joi.detailsSchema.validate(user)
  },
  myzod: function () {
    myzod.detailsSchema.parse(user)
  },
  yup: function () {
    yup.detailsSchema.validateSync(user)
  },
  zod: function () {
    zod.detailsSchema.parse(user)
  }
}, {
  errorThreshold: 0,
  iterations: 10_000_000,
  print: {
    colors: false
  }
}, (err, results) => {
  if (err) {
    throw err
  }
  console.log(JSON.stringify(results, null, 2))
})
