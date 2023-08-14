import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderProducts extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public productId: string

  @column()
  public orderId: string
}
