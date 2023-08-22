import fetch from 'node-fetch'

export default class CatalogApi {
  public static ENDPOINT = 'http://ms-catalog.goodfood.svc.cluster.local/catalog'

  public static async getProduct(id: string): Promise<{
    label: string
    price: number
    restaurantId: string
    quantity: number
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/products/${id}`)

    if (response.ok) {
      return response.json() as Promise<{
        label: string
        price: number
        restaurantId: string
        quantity: number
      }>
    }

    return null
  }

  public static async getIngredient(
    restaurantId: string,
    id: string
  ): Promise<{
    name: string
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/${restaurantId}/ingredients/${id}`)
    if (response.ok) {
      return response.json() as Promise<{ name: string }>
    }

    return null
  }
}
