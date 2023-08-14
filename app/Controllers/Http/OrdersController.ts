import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrdersValidator from 'App/Validators/OrdersValidator'

export default class OrderingsController {
  public async index({ request, response }: HttpContextContract) {
    const userId = request.header('UserID')

    if (!userId) {
      throw new Error('User not found')
    }

    const page = request.input('page', 1)
    const limit = 10

    const order = await Order.query().where('user_id', userId).paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(OrdersValidator)
    const order = await Order.create(data)
    return response.status(200).json(order)
  }

  public async show({ request, params, response }: HttpContextContract) {
    const userId = request.header('UserID')
    const role = request.header('Role')
    const restaurantId = request.header('RestaurantID')

    if (!userId) {
      throw new Error('User not found')
    }

    if (!role) {
      throw new Error('Role not found')
    }

    const order = await Order.findOrFail(params.id)

    if (
      order.userId === userId ||
      role === 'admin' ||
      ((role === 'manager' || role === 'deliverer') && restaurantId === order.restaurantId)
    ) {
      return response.status(200).json(order)
    }

    return response.status(401).json({ message: 'Unauthorized' })
  }
}
