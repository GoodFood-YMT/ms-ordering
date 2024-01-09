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
import { ProviderOrdersStatus } from 'App/Enums/ProviderOrdersStatus'
import IngredientsProvidersOrder from 'App/Models/IngredientsProvidersOrder'
import Rabbit from '@ioc:Adonis/Addons/Rabbit'

export default class ProvidersOrders extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public previousStatus: ProviderOrdersStatus

  @column()
  public status: ProviderOrdersStatus

  @column()
  public providerId: string

  @column()
  public restaurantId: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => IngredientsProvidersOrder, {
    foreignKey: 'orderId',
    localKey: 'id',
  })
  public ingredients: HasMany<typeof IngredientsProvidersOrder>

  @beforeCreate()
  public static async setId(providersOrders: ProvidersOrders) {
    providersOrders.id = cuid()
  }

  @afterCreate()
  public static async paymentTunnel(order: ProvidersOrders) {
    setTimeout(() => {
      order.previousStatus = order.status
      order.status = ProviderOrdersStatus.DELIVERED
      order.save()
    }, 10000)
  }

  @afterSave()
  public static async afterDelivered(order: ProvidersOrders) {
    if (order.previousStatus !== order.status && order.status === ProviderOrdersStatus.DELIVERED) {
      await Rabbit.assertQueue('catalog.ingredients.stock')
      await order.load('ingredients')
      for (const ingredient of order.ingredients) {
        await Rabbit.sendToQueue(
          'catalog.ingredients.stock',
          JSON.stringify({
            restaurantId: order.restaurantId,
            ingredientId: ingredient.ingredientId,
            add: ingredient.quantity,
          })
        )
      }
    }
  }
}
