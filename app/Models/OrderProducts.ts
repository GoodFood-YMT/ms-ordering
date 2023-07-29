import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class OrderProducts extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantity: number

  @column()
  public productId: string

  @column()
  public orderId: string

  @beforeCreate()
  public static async setId(OrderProducts: OrderProducts) {
    OrderProducts.id = cuid()
  }
}
