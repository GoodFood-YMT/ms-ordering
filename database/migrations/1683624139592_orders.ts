import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { OrdersStatus } from 'App/Enums/OrdersStatus'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.enum('status', Object.values(OrdersStatus)).defaultTo(OrdersStatus.UNPAID).notNullable()
      table.decimal('total_price').notNullable()
      table.string('user_id').notNullable()
      table.string('address_id').notNullable()
      table.string('restaurant_id').notNullable()
      table.string('delivery_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
