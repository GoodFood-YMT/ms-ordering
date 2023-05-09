import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderingValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.string([rules.status()]),
  })

  public messages: CustomMessages = {
    'status.required': 'Le status est obligatoire',
  }
}
