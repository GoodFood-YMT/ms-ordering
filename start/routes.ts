import Route from '@ioc:Adonis/Core/Route'

Route.get('/ordering', 'OrderingsController.index') //getall
Route.post('/ordering', 'OrderingsController.store') //create
Route.get('/ordering/:id', 'OrderingsController.show') //getbyid
Route.patch('/ordering/:id', 'OrderingsController.update') //update

Route.get('/providerOrders', 'ProvidersOrdersController.index') //getall
Route.post('/providerOrders', 'ProvidersOrdersController.store') //create
Route.get('/providerOrders/:id', 'ProvidersOrdersController.show') //getbyid
Route.patch('/providerOrders/:id', 'ProvidersOrdersController.update') //update
