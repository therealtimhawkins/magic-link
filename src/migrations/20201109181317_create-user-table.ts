import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return Promise.resolve().then(() =>
    knex.schema.createTable('users', t => {
      t.increments()
      t.string('uuid')
        .notNullable()
        .index()
      t.string('email')
        .notNullable()
        .index()
      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  )
}

export async function down(knex: Knex): Promise<void> {
  return Promise.resolve().then(() => knex.schema.dropTableIfExists('users'))
}
