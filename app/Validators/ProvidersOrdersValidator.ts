import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProvidersOrdersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ingredients: schema.array().members(
      schema.object().members({
        ingredientId: schema.string(),
        quantity: schema.number([rules.minLength(1)]),
      })
    ),
  })

  public messages: CustomMessages = {}
}
