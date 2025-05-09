import type { HttpContext } from '@adonisjs/core/http'

export default class PageCreatesController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/pages/create')
    } catch(error) {
      console.error({ error })
    }
  }  
}