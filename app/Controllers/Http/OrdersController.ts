import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CatalogApi from 'App/Api/CatalogApi'
import Order from 'App/Models/Order'
import OrdersValidator from 'App/Validators/OrdersValidator'

export default class OrdersController {
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

  public async getManagerOrders({ request, response }: HttpContextContract) {
    const userId = request.header('UserID')
    const restaurantId = request.header('RestaurantID')

    if (!userId) {
      throw new Error('User not found')
    }

    if (!restaurantId) {
      throw new Error('Restaurant not found')
    }

    const page = request.input('page', 1)
    const limit = 10

    const order = await Order.query().where('restaurant_id', restaurantId).paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const userId = request.header('UserID')

    if (!userId) {
      throw new Error('User not found')
    }

    const data = await request.validate(OrdersValidator)

    if (data.products.length === 0) {
      return response.status(400).json({ message: 'You must have at least one product' })
    }

    const products: { id: string; quantity: number; price: number; restaurantId: string }[] = []

    for (const product of data.products) {
      const productData = await CatalogApi.getProduct(product.productId)
      products.push({
        id: product.productId,
        quantity: product.quantity,
        price: productData.price,
        restaurantId: productData.restaurantId,
      })
    }

    // check if all products come from the same restaurant
    for (const product of products) {
      if (product.restaurantId !== products[0].restaurantId) {
        return response.status(400).json({ message: 'Products must come from the same restaurant' })
      }
    }

    // calculate total price
    let totalPrice = 0
    for (const product of products) {
      totalPrice += product.price * product.quantity
    }

    const order = await Order.create({
      userId,
      addressId: data.addressId,
      restaurantId: products[0].restaurantId,
      totalPrice,
    })

    for (const product of products) {
      await order.related('products').create({
        productId: product.id,
        quantity: product.quantity,
      })
    }

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
    await order.load('products')

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
