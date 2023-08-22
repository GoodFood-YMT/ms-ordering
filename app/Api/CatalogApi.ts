import fetch from 'node-fetch'

export default class CatalogApi {
  public static ENDPOINT = 'http://ms-catalog.goodfood.svc.cluster.local/catalog'

  public static async getProduct(id: string): Promise<{
    price: number
    restaurantId: string
    quantity: number
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/products/${id}`)

    if (response.ok) {
      return response.json() as Promise<{ price: number; restaurantId: string; quantity: number }>
    }

    return null
  }

  public static async getIngredient(
    restaurantId: string,
    id: string
  ): Promise<{
    name: string
  }> {
    const response = await fetch(`${this.ENDPOINT}/restaurants/${restaurantId}/ingredients/${id}`)
    return response.json() as Promise<{ name: string }>
  }
}
