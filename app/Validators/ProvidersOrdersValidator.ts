import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProvidersOrdersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    providerId: schema.string(),
    ingredients: schema.array().members(
      schema.object().members({
        ingredientId: schema.string(),
        quantity: schema.number([rules.range(1, 100)]),
      })
    ),
  })

  public messages: CustomMessages = {}
}
