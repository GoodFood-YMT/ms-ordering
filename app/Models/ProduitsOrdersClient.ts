import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProduitsOrdersClient extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantite: string

  @column()
  public produit_id: string

  @column()
  public order_id: string

  @column()
  public client_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
