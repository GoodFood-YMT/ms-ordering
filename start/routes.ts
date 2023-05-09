import Route from '@ioc:Adonis/Core/Route'

Route.get('/orders', 'OrderingsController.index') //getall
Route.post('/orders', 'OrderingsController.store') //create
Route.get('/orders/:id', 'OrderingsController.show') //getbyid
Route.patch('/orders/:id', 'OrderingsController.update') //update
