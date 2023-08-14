import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  afterCreate,
  beforeCreate,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import OrderProducts from 'App/Models/OrderProducts'
import { OrdersStatus } from 'App/Enums/OrdersStatus'
import Rabbit from '@ioc:Adonis/Addons/Rabbit'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public previousStatus: OrdersStatus

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

  @afterCreate()
  public static async paymentTunnel(order: Order) {
    setTimeout(() => {
      order.status = OrdersStatus.PAID
      order.save()
    }, 5000)
  }

  @afterCreate()
  public static async publishMarketing(order: Order) {
    Rabbit.assertQueue('marketing.order.created')
    Rabbit.sendToQueue(
      'marketing.order.created',
      JSON.stringify({
        orderId: order.id,
        totalPrice: order.totalPrice,
        userId: order.userId,
        restaurantId: order.restaurantId,
        createdAt: order.createdAt,
      })
    )
  }

  // @beforeSave()
  // public static async setPreviousStatus(order: Order) {
  //   order.previousStatus = order.status
  //   order.save()
  // }

  // @afterSave()
  // public static async deliveryTunnel(order: Order) {
  //   if (order.previousStatus !== order.status && order.status === OrdersStatus.PAID) {
  //     Rabbit.assertQueue('delivery.create')
  //     Rabbit.sendToQueue(
  //       'delivery.create',
  //       JSON.stringify({
  //         orderId: order.id,
  //         addressId: order.addressId,
  //         restaurantId: order.restaurantId,
  //       })
  //     )
  //   }
  // }
}
