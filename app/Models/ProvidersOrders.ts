import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class ProvidersOrders extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public status: string //'PENDING' | 'PAID' | 'UNPAID'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public providerId: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId(providersOrders: ProvidersOrders) {
    providersOrders.id = cuid()
  }
}
