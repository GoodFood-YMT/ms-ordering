import fetch from 'node-fetch'

export default class ProvidersApi {
  public static ENDPOINT = 'http://ms-providers.goodfood.svc.cluster.local:3333/providers'

  public static async getProvider(
    providerId: string,
    restaurantId: string
  ): Promise<{
    id: string
    name: string
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/${providerId}`, {
      headers: {
        RestaurantID: restaurantId,
      },
    })

    if (response.ok) {
      return response.json() as Promise<{ id: string; name: string }>
    }

    return null
  }
}
