import fetch from 'node-fetch'

export default class CatalogApi {
  public static ENDPOINT = 'http://ms-catalog.goodfood.svc.cluster.local/catalog'

  public static async getProduct(id: string): Promise<{
    price: number
    restaurantId: string
  }> {
    const response = await fetch(`${this.ENDPOINT}/products/${id}`)
    return (await response.json()) as { price: number; restaurantId: string }
  }
}
