'use strict'

const User = use("App/Models/User")
const Role = use('Role')

class UserController {
  async get({ params }){
    var user = await User.find(params.id)

    return {user}
  }

  async list({ request, view }){
    var users = await User.all()

    return view.render('admin/user_manager', { users: users.toJSON(), params: request.only('registered') })
  }


  async create({ request, response }){
    const user_data = request.only(["name", "last_name", "email", "password", "phone"])
    const user_role = request.only(["role"])
    const user = await User.create(user_data)
    
    user.roles().attach(user_role)

    return response.route('user_manager', {registered: true})
  }

  async edit({ request, params, response }){
    const user = await User.find(params.id)

    user.email = request.input("edit_email")
    user.phone = request.input("edit_phone")
    user.password = request.input("edit_password")

    await user.save()

    return response.route('/admin/user_manager')
  }

  async delete ({ params, response }){
    const user = await User.find(params.id)

    await user.delete()

    return response.route('/')
  }

  async login ({ request, auth, response }){
    const user_data = request.all()
    if(await auth.attempt(user_data.login_email, user_data.login_password)){
      return response.redirect('/')
    }
    else{
      return 'Erro de login'
    }
  }

  async logout ({ auth, response }){
    await auth.logout()

    return response.redirect('/')
  }
}

module.exports = UserController
