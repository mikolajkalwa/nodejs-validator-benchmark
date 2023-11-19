import { user } from './fixture.js'
import * as ajv from './schemas/ajv.js'
import * as joi from './schemas/joi.js'
import * as myzod from './schemas/myzod.js'
import * as yup from './schemas/yup.js'
import * as zod from './schemas/zod.js'

console.log('ajv base', ajv.baseSchema(user))
console.log('ajv details', ajv.detailsSchema(user))

console.log('joi base', joi.baseSchema.validate(user))
console.log('joi details', joi.detailsSchema.validate(user))

console.log('myzod base', myzod.baseSchema.parse(user))
console.log('myzod details', myzod.detailsSchema.parse(user))

console.log('yup base', yup.baseSchema.validateSync(user))
console.log('yup details', yup.detailsSchema.validateSync(user))

console.log('zod base', zod.baseSchema.parse(user))
console.log('zod details', zod.detailsSchema.parse(user))
