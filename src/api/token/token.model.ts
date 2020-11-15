import knex from '@/config/knex'
import Boom from '@hapi/boom'

export const create = (data: object) => {
  try {
    return knex('tokens').insert(data)
  } catch {
    throw Boom.gatewayTimeout()
  }
}

export const get = (token: string) => {
  try {
    return knex('tokens')
      .select('*')
      .where({ token })
      .first()
  } catch {
    throw Boom.gatewayTimeout()
  }
}
