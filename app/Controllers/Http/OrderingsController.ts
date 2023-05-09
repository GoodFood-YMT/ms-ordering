import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ordering from 'App/Models/Ordering'
import OrderingValidator from 'App/Validators/OrderingValidator'

export default class OrderingsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const order = await Ordering.query().paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(OrderingValidator)
    const order = await Ordering.create(data)
    return response.status(200).json(order)
  }

  public async show({ params, response }: HttpContextContract) {
    const order = await Ordering.findOrFail(params.id)
    return response.status(200).json(order)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(OrderingValidator)
    const order = await Ordering.findOrFail(params.id)
    order.status = data.status
    await order.save()
    return response.status(200).json(order)
  }
}
