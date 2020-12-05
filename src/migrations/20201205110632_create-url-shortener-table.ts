import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return Promise.resolve().then(() =>
    knex.schema.createTable('urls', t => {
      t.increments()
      t.string('code')
        .notNullable()
        .index()
      t.string('long_url')
        .notNullable()
        .index()
      t.string('short_url')
        .notNullable()
        .index()
      t.integer('click_count')
        .notNullable()
        .index()
      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  )
}

export async function down(knex: Knex): Promise<void> {
  return Promise.resolve().then(() => knex.schema.dropTableIfExists('urls'))
}
