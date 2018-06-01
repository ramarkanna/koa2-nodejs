import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
import validator, { object, string } from 'koa-context-validator'
import * as task from './controller'

export const baseUrl = '/tasks'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          name: string().required(),
          urgency: string().required()
        }).required()
      }),
      task.createTask
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      validateSession,
      task.getTasks,
      fromStateToBody(['tasks'])
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      validateSession,
      task.getTask,
      fromStateToBody(['task'])
    ]
  },
  {
    method: 'PUT',
    route: '/',
    handlers: [
      validator({
        body: object({
          name: string().required(),
          newName: string().required(),
          urgency: string().required()
        }).required()
      }),
      task.updateTask
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      validateSession,
      task.deleteTask
    ]
  }
]
