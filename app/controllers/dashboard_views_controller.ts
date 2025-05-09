import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardViewsController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/page')
    } catch(error) {
      console.error({ error })
    }
  }  
}