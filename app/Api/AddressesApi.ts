import fetch from 'node-fetch'

export default class AddressesApi {
  public static ENDPOINT = 'http://ms-delivery.goodfood.svc.cluster.local/delivery'

  public static async getAddress(
    userId: string,
    addressId: string
  ): Promise<{
    id: string
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/addresses/${addressId}`, {
      headers: {
        UserID: userId,
      },
    })

    if (response.ok) {
      return response.json() as Promise<{ id: string }>
    }

    return null
  }
}
