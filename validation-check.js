import { user } from './src/fixture.js'
import * as ajv from './src/schemas/ajv.js'
import * as joi from './src/schemas/joi.js'

console.log('ajv base', ajv.baseSchema(user))
console.log('ajv details', ajv.detailsSchema(user))

console.log('joi base', joi.baseSchema.validate(user))
console.log('joi details', joi.detailsSchema.validate(user))
