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
      await auth.use('web').login(user)
      
      return response.ok({ success: true })
    
    } catch (error: any) {
      if (error.messages && error.messages.errors) {
        // Vine validation error
        return response.status(422).json({
          success: false,
          message: 'Validation failed',
          errors: error.messages.errors.reduce((acc: any, curr: any) => {
            acc[curr.field] = curr.message;
            return acc;
          }, {})
        })
      }
      return response.status(error.status).json({ success: false, message: error.message || 'Login failed' })
    }
  }  
}