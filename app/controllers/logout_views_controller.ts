import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutViewsController {
  async handle({ response, auth }: HttpContext) {
    try {
      // @ts-ignore
      await auth.use('web').logout()

      return response.redirect().toRoute('login.view')
    } catch(error) {
      console.error({ error })
    }
  }  
}