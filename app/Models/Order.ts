import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public status: string //'PENDING' | 'PAID' | 'UNPAID'

  @column()
  public totalPrice: number  

  @column()
  public userId: string
  
  @column()
  public addressId: string

  @column()
  public restaurantId: string

  @column()
  public deliveryId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId(order: Order) {
    order.id = cuid()
  }
}
