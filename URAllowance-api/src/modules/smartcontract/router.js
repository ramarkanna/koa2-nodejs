import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
import validator, { object, string } from 'koa-context-validator'
import * as smartcontract from './controller'

export const baseUrl = '/smartcontract'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          name: string().required(),
          desription: string().required(),
          assign_to: string().required(),
          reward: string().required(),
          creationdate: string().required(),
          expirydate: string().required(),
          status: string().required(),
          approved: string().required()
        }).required()
      }),
      smartcontract.createSmartContract
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      validateSession,
      smartcontract.getSmartContract,
      fromStateToBody(['smartcontract'])
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      validateSession,
      smartcontract.getSmartContract,
      fromStateToBody(['smartcontract'])
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
          desription: string().required(),
          assign_to: string().required(),
          reward: string().required(),
          creationdate: string().required(),
          expirydate: string().required(),
          status: string().required(),
          approved: string().required()

        }).required()
      }),
      smartcontract.updateSmartContract
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      validateSession,
      smartcontract.deleteSmartContract
    ]
  }
]
