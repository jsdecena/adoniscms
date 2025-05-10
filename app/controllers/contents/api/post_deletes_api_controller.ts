import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostDeletesApiController {
  async handle({ response, params }: HttpContext) {
    try {
      const post = await Content.findOrFail(params.id)
      await post.delete()
      return response.json({ data: 'Success' })
    } catch(error) {
      console.error({ error })
    }
  }
}
