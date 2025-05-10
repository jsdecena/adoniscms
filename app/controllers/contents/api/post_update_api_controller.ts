import Content from '#models/content'
import { postValidator } from '#validators/post_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostUpdateApiController {
  async handle({ response, request, params }: HttpContext) {
    try {
      const data = request.only(['title', 'body', 'excerpt', 'status', 'visibility', 'type'])
      const validated = await postValidator.validate(data)
      const post = await Content.findOrFail(params.id)
      await post.merge({ 
        title: validated.title, 
        body: validated.body, 
        excerpt: validated.excerpt, 
        status: validated.status, 
        visibility: validated.visibility, 
        type: validated.type 
      }).save()
      return response.json(post)
    } catch(error) {
      console.error({ error })
    }
  }
}
