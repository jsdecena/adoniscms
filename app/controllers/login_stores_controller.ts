import User from '#models/user'
import { loginValidator } from '#validators/login_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginStoresController {
  async handle({ request, response, auth }: HttpContext) {

    try {
      /**
       * Step 1: Validate input
       */
      const data = request.only(['email', 'password'])

      const { email, password } = await loginValidator.validate(data)

      const user = await User.verifyCredentials(email, password)

      // @ts-ignore
      await auth.login(user)
      
      return response.noContent()
    
    } catch(error) {
      console.error({ error })
      return response.noContent()
    }
  }  
}