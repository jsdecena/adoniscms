import type { HttpContext } from '@adonisjs/core/http'

export default class LoginViewsController {
  async handle({ inertia }: HttpContext) {
    try {
      // Check if already logged-in, then redirect to calendar page
      // @ts-ignore
      // const isLoggedIn = await auth.check()
      // if (isLoggedIn) {
      //   return response.redirect('dashboard')
      // }

      return inertia.render('login/page')
    } catch(error) {
      console.error({ error })
    }
  }  
}