import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('product_id').notNullable()
      table.string('order_id').references('id').inTable('orders').onDelete('CASCADE')
      table.integer('quantity').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
