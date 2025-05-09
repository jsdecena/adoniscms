import type { HttpContext } from '@adonisjs/core/http'

export default class PostViewsController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/posts/list')
    } catch(error) {
      console.error({ error })
    }
  }  
}