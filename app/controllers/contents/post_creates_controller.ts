import type { HttpContext } from '@adonisjs/core/http'

export default class PostCreatesController {
  async handle({ inertia }: HttpContext) {
    try {
      return inertia.render('admin/contents/posts/create')
    } catch(error) {
      console.error({ error })
    }
  }  
}
