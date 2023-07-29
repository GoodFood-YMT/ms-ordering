import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Order from './Order'

export default class OrderProducts extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantity: number

  @column()
  public productId: string

  @hasMany(() => Order)
  public orderId: HasMany<typeof Order>
  

  @beforeCreate()
  public static async setId(OrderProducts: OrderProducts) {
    OrderProducts.id = cuid()
  }
}
