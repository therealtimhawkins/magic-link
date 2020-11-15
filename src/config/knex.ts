import Knex from 'knex'
import mockKnex from 'mock-knex'
import { knexSnakeCaseMappers } from 'objection'
import config from '@/knexfile'
let knex: Knex

if (process.env.NODE_ENV === 'test') {
  knex = Knex({ client: 'mysql', debug: false })
  mockKnex.mock(knex)
} else {
  knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: config.connection,
    ...knexSnakeCaseMappers()
  })
}

export default knex
