import type { HttpContext } from '@adonisjs/core/http'

export default class PageEditsController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/pages/edit')
    } catch(error) {
      console.error({ error })
    }
  }  
}