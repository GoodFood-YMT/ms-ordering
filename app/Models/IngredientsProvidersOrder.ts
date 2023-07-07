import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class IngredientsProvidersOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantity: number

  @column()
  public providerId: string

  @column()
  public orderId: string

  @column()
  public ingredientId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async setId(ingredientsProvidersOrder: IngredientsProvidersOrder) {
    ingredientsProvidersOrder.id = cuid()
  }
}
