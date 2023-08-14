import Rabbit from '@ioc:Adonis/Addons/Rabbit'
import { validator, schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'

const deliveryCreatedSchema = schema.create({
  orderId: schema.string(),
  deliveryId: schema.string(),
})

async function listenDeliveryCreated() {
  console.log('Delivery created queue started')

  await Rabbit.assertQueue('delivery.created')

  await Rabbit.consumeFrom('delivery.created', async (message) => {
    try {
      const payload = await validator.validate({
        schema: deliveryCreatedSchema,
        data: JSON.parse(message.content),
      })

      const order = await Order.findBy('id', payload.orderId)

      if (order) {
        order.deliveryId = payload.deliveryId
        order.save()
      }
    } catch (e) {
      console.log('Delivery created payload not valid', e.message)
    }

    message.ack()
  })
}

listenDeliveryCreated()
