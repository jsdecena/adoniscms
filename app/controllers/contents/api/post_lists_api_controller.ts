import Content, { ENUM_CONTENT_TYPE } from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostListsApiController {
  async handle({ response }: HttpContext) {
    try {
      const posts = await Content.query().where('type', ENUM_CONTENT_TYPE.POST)
        .orderBy('title', 'asc')
        .paginate(1, 100)
        
      return response.json(posts)
    } catch(error) {
      console.error({ error })
    }
  }
}
