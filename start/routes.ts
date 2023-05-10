import Route from '@ioc:Adonis/Core/Route'

Route.get('/orders', 'OrdersController.index') //getall
Route.post('/orders', 'OrdersController.store') //create
Route.get('/orders/:id', 'OrdersController.show') //getbyid
Route.patch('/orders/:id', 'OrdersController.update') //update

Route.get('/providerOrders', 'ProvidersOrdersController.index') //getall
Route.post('/providerOrders', 'ProvidersOrdersController.store') //create
Route.get('/providerOrders/:id', 'ProvidersOrdersController.show') //getbyid
Route.patch('/providerOrders/:id', 'ProvidersOrdersController.update') //update
