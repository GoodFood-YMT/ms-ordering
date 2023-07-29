import Route from '@ioc:Adonis/Core/Route'

Route.get('/orders', 'OrdersController.index') //getall
Route.post('/orders', 'OrdersController.store') //create
Route.get('/orders/:id', 'OrdersController.show') //getbyid

Route.get('/providers/orders', 'ProvidersOrdersController.index') //getall
Route.post('/providers/orders', 'ProvidersOrdersController.store') //create
Route.get('/providers/orders/:id', 'ProvidersOrdersController.show') //getbyid
Route.patch('/providers/orders/:id', 'ProvidersOrdersController.update') //update
