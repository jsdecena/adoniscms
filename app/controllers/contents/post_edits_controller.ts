import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostEditsController {
  async handle({ inertia, params }: HttpContext) {
    try {
      const post = await Content.findOrFail(params.id)
      return inertia.render('admin/contents/posts/edit', { post })
    } catch(error) {
      console.error({ error })
    }
  }  
}
