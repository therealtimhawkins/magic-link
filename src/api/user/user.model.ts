import knex from '@/config/knex'

export const get = (email: string) => {
  return knex('users')
    .select('*')
    .where({ email })
    .first()
}

export const create = (data: object) => {
  return knex('users').insert(data)
}
