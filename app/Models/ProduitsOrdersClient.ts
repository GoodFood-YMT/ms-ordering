import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProduitsOrdersClient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantite: number

  @column()
  public produit_id: number

  @column()
  public order_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
