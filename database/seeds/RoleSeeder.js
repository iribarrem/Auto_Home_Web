'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')

class RoleSeeder {
  async run () {
    const roleAdmin = new Role()
    roleAdmin.name = "Administrador"
    roleAdmin.slug = "admin"
    await roleAdmin.save()

    const roleMorador = new Role()
    roleMorador.name = "Morador"
    roleMorador.slug = "morador"
    await roleMorador.save()

    const roleVisitor = new Role()
    roleVisitor.name = "Visitante"
    roleVisitor.slug = "visitante"
    await roleVisitor.save()
  }
}

module.exports = RoleSeeder
