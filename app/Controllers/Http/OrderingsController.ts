import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrdersValidator from 'App/Validators/OrdersValidator'

export default class OrderingsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const order = await Order.query().paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(OrdersValidator)
    const order = await Order.create(data)
    return response.status(200).json(order)
  }

  public async show({ params, response }: HttpContextContract) {
    const order = await Order.findOrFail(params.id)
    return response.status(200).json(order)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(OrdersValidator)
    const order = await Order.findOrFail(params.id)
    order.status = data.status
    await order.save()
    return response.status(200).json(order)
  }
}
