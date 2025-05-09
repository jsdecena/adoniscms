import type { HttpContext } from '@adonisjs/core/http'

export default class PostViewsController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/post')
    } catch(error) {
      console.error({ error })
    }
  }  
}