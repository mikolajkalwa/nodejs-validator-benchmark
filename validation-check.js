import { user } from './src/fixture.js'
import * as ajv from './src/schemas/ajv.js'
import * as joi from './src/schemas/joi.js'
import * as myzod from './src/schemas/myzod.js'
import * as yup from './src/schemas/yup.js'

console.log('ajv base', ajv.baseSchema(user))
console.log('ajv details', ajv.detailsSchema(user))

console.log('joi base', joi.baseSchema.validate(user))
console.log('joi details', joi.detailsSchema.validate(user))

console.log('myzod base', myzod.baseSchema.parse(user))
console.log('myzod details', myzod.detailsSchema.parse(user))

console.log('yup base', yup.baseSchema.validateSync(user))
console.log('yup details', yup.detailsSchema.validateSync(user))
