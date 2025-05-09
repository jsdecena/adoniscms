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

      console.log(data, 'DATA')
      const { email, password } = await loginValidator.validate(data)

      const user = await User.verifyCredentials(email, password)

      // @ts-ignore
      await auth.login(user)
      
      return response.ok({ success: true })
    
    } catch(error) {
      console.error({ error })
      return response.status(400).json({ success: false, message: error.message || 'Login failed' })
    }
  }  
}