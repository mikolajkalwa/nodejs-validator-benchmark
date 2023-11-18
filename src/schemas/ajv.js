import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

export const baseSchema = ajv.compile({
  type: 'object',
  properties: {
    name: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        last: { type: 'string' }
      },
      required: ['first', 'last']
    },
    login: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    },
    organization_id: { type: 'string' },
    requested_at: { type: 'string' }
  },
  required: [
    'name',
    'login',
    'organization_id',
    'requested_at'
  ]
})

export const detailsSchema = ajv.compile({
  type: 'object',
  properties: {
    name: {
      type: 'object',
      properties: {
        first: { type: 'string', minLength: 1, maxLength: 999 },
        last: { type: 'string', minLength: 1, maxLength: 999 }
      },
      required: ['first', 'last']
    },
    login: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 12, maxLength: 50 }
      },
      required: ['email', 'password']
    },
    organization_id: { type: 'string', format: 'uuid' },
    requested_at: { type: 'string', format: 'date-time' }
  },
  required: [
    'name',
    'login',
    'organization_id',
    'requested_at'
  ]
})
