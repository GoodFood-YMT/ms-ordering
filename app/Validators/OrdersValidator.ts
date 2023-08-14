import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    addressId: schema.string(),
    products: schema.array().members(
      schema.object().members({
        productId: schema.string(),
        quantity: schema.number(),
      })
    ),
  })

  public messages: CustomMessages = {}
}
