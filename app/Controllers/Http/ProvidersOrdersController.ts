import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProvidersOrders from 'App/Models/ProvidersOrders'
import ProvidersOrdersValidator from 'App/Validators/ProvidersOrdersValidator'

export default class ProvidersOrdersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const order = await ProvidersOrders.query().paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(ProvidersOrdersValidator)
    const order = await ProvidersOrders.create(data)
    return response.status(200).json(order)
  }

  public async show({ params, response }: HttpContextContract) {
    const order = await ProvidersOrders.findOrFail(params.id)
    return response.status(200).json(order)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(ProvidersOrdersValidator)
    const order = await ProvidersOrders.findOrFail(params.id)
    order.status = data.status
    await order.save()
    return response.status(200).json(order)
  }
}
