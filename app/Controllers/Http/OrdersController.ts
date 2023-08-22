import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressesApi from 'App/Api/AddressesApi'
import CatalogApi from 'App/Api/CatalogApi'
import { OrdersStatus } from 'App/Enums/OrdersStatus'
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

    const order = await Order.query()
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
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

    const order = await Order.query()
      .where('restaurant_id', restaurantId)
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
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

    // validate address
    const address = await AddressesApi.getAddress(userId, data.addressId)
    if (!address) {
      return response.status(400).json({ message: 'Address not found' })
    }

    const products: { id: string; quantity: number; price: number; restaurantId: string }[] = []

    for (const product of data.products) {
      const productData = await CatalogApi.getProduct(product.productId)

      if (!productData) {
        return response.status(400).json({ message: 'Product not found' })
      }

      // check if product in stock
      if (productData.quantity < product.quantity) {
        return response.status(400).json({ message: 'Product out of stock' })
      }

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
      status: OrdersStatus.UNPAID,
      previousStatus: OrdersStatus.UNPAID,
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

    const products: {
      product_id: string
      quantity: number
      price: number
      label: string
    }[] = []

    for (const product of order.products) {
      const productData = await CatalogApi.getProduct(product.productId)

      if (!productData) {
        continue
      }

      products.push({
        product_id: product.productId,
        quantity: product.quantity,
        price: productData.price,
        label: productData.label,
      })
    }

    if (
      order.userId === userId ||
      role === 'admin' ||
      ((role === 'manager' || role === 'deliverer') && restaurantId === order.restaurantId)
    ) {
      return response.status(200).json({
        ...order.toJSON(),
        products: products,
      })
    }

    return response.status(401).json({ message: 'Unauthorized' })
  }
}
