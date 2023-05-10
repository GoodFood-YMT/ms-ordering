import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OrdersStatus } from 'App/Enums/OrdersStatus'

export default class ProvidersOrdersValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum(Object.values(OrdersStatus)),
  })

  public messages: CustomMessages = {
    'status.required': 'Le status est obligatoire',
  }
}
