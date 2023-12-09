import { user } from './bench-single-object/user.js'
import { users } from './bench-many-objects/users.js'
import * as ajv from './schemas/ajv.js'
import * as joi from './schemas/joi.js'
import * as myzod from './schemas/myzod.js'
import * as yup from './schemas/yup.js'
import * as zod from './schemas/zod.js'

console.log('Single object bench, check if object pass the validation')
console.log('ajv base', ajv.baseSchema(user))
console.log('ajv details', ajv.detailsSchema(user))

console.log('joi base', !joi.baseSchema.validate(user).error)
console.log('joi details', !joi.detailsSchema.validate(user).error)

console.log('myzod base', myzod.baseSchema.try(user) instanceof Error ? false : true)
console.log('myzod details', myzod.detailsSchema.try(user) instanceof Error ? false : true)

console.log('yup base', yup.baseSchema.isValidSync(user, { strict: true }))
console.log('yup details', yup.detailsSchema.isValidSync(user, { strict: true }))

console.log('zod base', !zod.baseSchema.safeParse(user).error)
console.log('zod details', !zod.detailsSchema.safeParse(user).error)


console.log('Many objects bench, check if all objects pass the validation')
console.log('ajv base', users.map(user => ajv.baseSchema(user)).every(result => result === true))
console.log('ajv details', users.map(user => ajv.detailsSchema(user)).every(result => result === true))

console.log('joi base', users.map(user => joi.baseSchema.validate(user)).every(result => !result.error))
console.log('joi details', users.map(user => joi.detailsSchema.validate(user)).every(result => !result.error))

console.log('myzod base', users.map(user => myzod.baseSchema.try(user)).every(result => !(result instanceof Error)))
console.log('myzod details', users.map(user => myzod.detailsSchema.try(user)).every(result => !(result instanceof Error)))

console.log('yup base', users.map(user => yup.baseSchema.isValidSync(user, { strict: true })).every(result => result === true))
console.log('yup details', users.map(user => yup.detailsSchema.isValidSync(user, { strict: true })).every(result => result === true))

console.log('zod base', users.map(user => zod.baseSchema.safeParse(user)).every(result => !result.error))
console.log('zod details', users.map(user => zod.detailsSchema.safeParse(user)).every(result => !result.error))
