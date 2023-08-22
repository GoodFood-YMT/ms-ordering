import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { ProviderOrdersStatus } from 'App/Enums/ProviderOrdersStatus'

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

  @beforeCreate()
  public static async setId(providersOrders: ProvidersOrders) {
    providersOrders.id = cuid()
  }
}
