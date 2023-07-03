import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orders from 'App/Models/Orders'
import OrdersValidator from 'App/Validators/OrdersValidator'

export default class OrderingsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const order = await Orders.query().paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(OrdersValidator)
    const order = await Orders.create(data)
    return response.status(200).json(order)
  }

  public async show({ params, response }: HttpContextContract) {
    const order = await Orders.findOrFail(params.id)
    return response.status(200).json(order)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(OrdersValidator)
    const order = await Orders.findOrFail(params.id)
    order.status = data.status
    await order.save()
    return response.status(200).json(order)
  }
}
