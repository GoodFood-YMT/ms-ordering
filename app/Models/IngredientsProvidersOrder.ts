import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IngredientsProvidersOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantite: number

  @column()
  public provider_id: number

  @column()
  public order_id: number

  @column()
  public ingredient_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
