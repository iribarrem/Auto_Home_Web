'use strict'

const User = use("App/Models/User")

class UserController {
  async create( { request, response, params }){
    const user_data = request.only(["name", "last_name", "email", "password", "phone"])

    const user = await User.create(user_data)

    if(params.role == "admin")
      await user.roles().attach([roleAdmin.id])
    else if(params.role == "morador")
      await user.roles().attach([roleMorador.id])
    else if(params.role == "visitor")
      await user.roles().attach([roleVisitor.id])

    return response.redirect('user_manager')
  }
}

module.exports = UserController
