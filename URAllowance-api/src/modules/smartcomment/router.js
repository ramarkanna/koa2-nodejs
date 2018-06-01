import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
import validator, { object, string } from 'koa-context-validator'
import * as smartcomment from './controller'

export const baseUrl = '/smartcomment'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          taskid: string().required(),
          comment: string().required(),
          commentedby: string().required(),
          commentdate: string().required()

        }).required()
      }),
      smartcomment.createSmartComment
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      validateSession,
      smartcomment.getSmartComment,
      fromStateToBody(['smartcomment'])
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      validateSession,
      smartcomment.getSmartComment,
      fromStateToBody(['smartcomment'])
    ]
  },
  {
    method: 'PUT',
    route: '/',
    handlers: [
      validator({
        body: object({
          taskid: string().required(),
          comment: string().required(),
          commentedby: string().required(),
          commentdate: string().required()

        }).required()
      }),
      smartcomment.updateSmartComment
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      validateSession,
      smartcomment.deleteSmartComment
    ]
  }
]
