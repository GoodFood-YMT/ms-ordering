import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/orders', 'OrdersController.index')
  Route.post('/orders', 'OrdersController.store')
  Route.get('/orders/:id', 'OrdersController.show')
  Route.get('/manager/orders', 'OrdersController.getManagerOrders')

  Route.get('/providers/orders', 'ProvidersOrdersController.index')
  Route.post('/providers/orders', 'ProvidersOrdersController.store')
  Route.get('/providers/orders/:id', 'ProvidersOrdersController.show')
  Route.patch('/providers/orders/:id', 'ProvidersOrdersController.update')
}).prefix('/ordering')
