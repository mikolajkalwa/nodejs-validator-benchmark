import { user } from './src/fixture.js'
import * as ajv from './src/schemas/ajv.js'

console.log('ajv base', ajv.baseSchema(user))
console.log('ajv details', ajv.detailsSchema(user))
