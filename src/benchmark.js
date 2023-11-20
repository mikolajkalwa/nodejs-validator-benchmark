import cronometro from 'cronometro'
import { user } from './fixture.js'
import * as ajv from './schemas/ajv.js'
import * as joi from './schemas/joi.js'
import * as myzod from './schemas/myzod.js'
import * as yup from './schemas/yup.js'
import * as zod from './schemas/zod.js'

cronometro({
  'ajv - types only': function () {
    ajv.baseSchema(user)
  },
  'ajv - full validation': function () {
    ajv.detailsSchema(user)
  },

  'joi - types only': function () {
    joi.baseSchema.validate(user)
  },
  'joi - full validation': function () {
    joi.detailsSchema.validate(user)
  },

  'myzod - types only': function () {
    myzod.baseSchema.parse(user)
  },
  'myzod - full validation': function () {
    myzod.detailsSchema.parse(user)
  },

  'yup - types only': function () {
    yup.baseSchema.validateSync(user)
  },
  'yup - full validation': function () {
    yup.detailsSchema.validateSync(user)
  },

  'zod - types only': function () {
    zod.baseSchema.parse(user)
  },
  'zod - full validation': function () {
    zod.detailsSchema.parse(user)
  }
}, {
  errorThreshold: 0,
  iterations: 1_000_000,
  print: {
    colors: false
  }
}, (err, results) => {
  if (err) {
    throw err
  }
  console.log(JSON.stringify(results, null, 2))
})
