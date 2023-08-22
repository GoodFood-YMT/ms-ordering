import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CatalogApi from 'App/Api/CatalogApi'
import { ProviderOrdersStatus } from 'App/Enums/ProviderOrdersStatus'
import ProvidersOrders from 'App/Models/ProvidersOrders'
import ProvidersOrdersValidator from 'App/Validators/ProvidersOrdersValidator'

export default class ProvidersOrdersController {
  public async index({ request, response }: HttpContextContract) {
    const restaurantId = request.header('RestaurantID')

    if (!restaurantId) {
      throw new Error('RestaurantID not found')
    }

    const page = request.input('page', 1)
    const limit = 10
    const order = await ProvidersOrders.query()
      .where('restaurant_id', '=', restaurantId)
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
    return response.status(200).json(order)
  }

  public async store({ request, response }: HttpContextContract) {
    const restaurantId = request.header('RestaurantID')

    if (!restaurantId) {
      throw new Error('RestaurantID not found')
    }

    const data = await request.validate(ProvidersOrdersValidator)

    if (data.ingredients.length === 0) {
      return response.status(400).json({ message: 'You must have at least one ingredient' })
    }

    const order = await ProvidersOrders.create({
      restaurantId,
      status: ProviderOrdersStatus.PENDING,
    })

    for (const ingredient of data.ingredients) {
      await order.related('ingredients').create({
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
      })
    }

    return response.status(200).json(order)
  }

  public async show({ params, request, response }: HttpContextContract) {
    const restaurantId = request.header('RestaurantID')

    if (!restaurantId) {
      throw new Error('RestaurantID not found')
    }

    const order = await ProvidersOrders.findOrFail(params.id)

    if (order.restaurantId !== restaurantId) {
      return response.status(403).json({ message: 'You are not allowed to see this order' })
    }

    const ingredients: { name: string; ingredientId: string; quantity: number }[] = []

    await order.load('ingredients')
    for (const ingredient of order.ingredients) {
      const ingredientData = await CatalogApi.getIngredient(restaurantId, ingredient.ingredientId)
      ingredients.push({
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
        name: ingredientData.name,
      })
    }

    return response.status(200).json({
      id: order.id,
      status: order.status,
      previousStatus: order.previousStatus,
      providerId: order.providerId,
      restaurantId: order.restaurantId,
      ingredients,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    })
  }
}
