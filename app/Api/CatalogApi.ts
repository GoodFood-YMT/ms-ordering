import fetch from 'node-fetch'

export default class CatalogApi {
  public static ENDPOINT = 'http://ms-catalog.goodfood.svc.cluster.local/catalog'

  public static async getProduct(id: string): Promise<{
    price: number
    restaurantId: string
    quantity: number
  }> {
    const response = await fetch(`${this.ENDPOINT}/products/${id}`)
    return response.json() as Promise<{ price: number; restaurantId: string; quantity: number }>
  }
}
