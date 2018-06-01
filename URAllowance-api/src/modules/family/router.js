import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
import validator, { object, string } from 'koa-context-validator'
import * as family from './controller'

export const baseUrl = '/family'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          family_name: string().required(),
          family_pic: string().required(),
          family_admin: string().required()
        }).required()
      }),
      family.createFamily
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      validateSession,
      family.getFamilies,
      fromStateToBody(['families'])
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      validateSession,
      family.getFamily,
      fromStateToBody(['family'])
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      validateSession,
      family.getFamily,
      family.updateFamily,
      fromStateToBody(['family'])
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      validateSession,
      family.getFamily,
      family.deleteFamily
    ]
  }
]
