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
Route.on('admin/user_manager').render('admin/user_manager')

Route
  .post('login', 'UserController.login')
  .middleware('guest')

Route.post('/admin/user', 'UserController.create')

Route.resource('permission', 'PermissionController').apiOnly().middleware('auth')
Route.resource('/roles', 'RoleController').apiOnly().middleware('auth')