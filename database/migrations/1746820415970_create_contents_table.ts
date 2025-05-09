import { ENUM_CONTENT_TYPE, ENUM_VISIBILITY } from '#models/content'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable()
      table.string('title', 254).notNullable()
      table.string('slug', 254).notNullable()
      table.text('body')
      table.text('excerpt')
      table.string('status').defaultTo('draft').comment('draft, published, archived')
      table.string('visibility').defaultTo(ENUM_VISIBILITY.PUBLIC).comment('public, private')
      table.string('type').defaultTo(ENUM_CONTENT_TYPE.POST).comment('page, post')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}