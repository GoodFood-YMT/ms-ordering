import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  afterCreate,
  afterSave,
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
    }, 10000)
  }

  @afterCreate()
  public static async publishMarketing(order: Order) {
    await Rabbit.assertQueue('marketing.order.created')
    await Rabbit.sendToQueue(
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

  @afterSave()
  public static async afterPaid(order: Order) {
    if (order.previousStatus !== order.status && order.status === OrdersStatus.PAID) {
      await Rabbit.assertQueue('delivery.create')
      await Rabbit.sendToQueue(
        'delivery.create',
        JSON.stringify({
          orderId: order.id,
          addressId: order.addressId,
          restaurantId: order.restaurantId,
        })
      )

      await Rabbit.assertQueue('catalog.products.sold')
      await order.load('products')
      for (const product of order.products) {
        await Rabbit.sendToQueue(
          'catalog.products.sold',
          JSON.stringify({
            restaurantId: order.restaurantId,
            productId: product.productId,
            quantity: product.quantity,
          })
        )
      }

      order.previousStatus = order.status
      order.save()
    }
  }
}
