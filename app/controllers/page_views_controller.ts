import type { HttpContext } from '@adonisjs/core/http'

export default class PageViewsController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/pages/list')
    } catch(error) {
      console.error({ error })
    }
  }  
}