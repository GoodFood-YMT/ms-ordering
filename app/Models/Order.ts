import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import OrderProducts from 'App/Models/OrderProducts'
import { OrdersStatus } from 'App/Enums/OrdersStatus'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public status: OrdersStatus

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

  @hasMany(() => OrderProducts, {
    foreignKey: 'orderId',
    localKey: 'id',
  })
  public products: HasMany<typeof OrderProducts>

  @beforeCreate()
  public static async setId(order: Order) {
    order.id = cuid()
  }
}
