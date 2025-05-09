import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PageEditsController {
  async handle({ inertia, params }: HttpContext) {
    try {
      const page = await Content.findOrFail(params.id)
      return inertia.render('admin/contents/pages/edit', { page })
    } catch(error) {
      console.error({ error })
    }
  }  
}