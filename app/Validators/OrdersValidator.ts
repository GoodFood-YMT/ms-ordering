import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    addressId: schema.string(),
    products: schema.array().members(
      schema.object().members({
        productId: schema.string(),
        quantity: schema.number([rules.range(1, 100)]),
      })
    ),
  })

  public messages: CustomMessages = {}
}
