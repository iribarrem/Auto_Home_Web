'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.on('rooms/gustavo').render('rooms/gustavo')
Route.on('rooms/gladis').render('rooms/gladis')

Route.group(() => {
  Route.get('admin/user_manager', 'UserController.list')
  Route.get('admin/user_manager/:id', 'UserController.get')
  Route.post('admin/user_manager', 'UserController.create')
  Route.post('admin/user_manager/:id', 'UserController.edit')
  Route.post('admin/user_manager/delete/:id', 'UserController.delete')
  Route.post('admin/login', 'UserController.login')
  Route.get('admin/logout', 'UserController.logout')
})
  //.middleware('auth')

Route.resource('permission', 'PermissionController').apiOnly().middleware('auth')
Route.resource('/roles', 'RoleController').apiOnly().middleware('auth')