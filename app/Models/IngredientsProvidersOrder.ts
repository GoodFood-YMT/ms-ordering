import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IngredientsProvidersOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantite: string

  @column()
  public provider_id: string

  @column()
  public order_id: string

  @column()
  public ingredient_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
