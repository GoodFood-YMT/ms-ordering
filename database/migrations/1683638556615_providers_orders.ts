import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProviderOrdersStatus } from 'App/Enums/ProviderOrdersStatus'

export default class extends BaseSchema {
  protected tableName = 'providers_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table
        .enum('status', Object.values(ProviderOrdersStatus))
        .defaultTo(ProviderOrdersStatus.PENDING)
        .notNullable()
      table
        .enum('previous_status', Object.values(ProviderOrdersStatus))
        .defaultTo(ProviderOrdersStatus.PENDING)
        .notNullable()
      table.string('provider_id').notNullable()
      table.string('restaurant_id').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
