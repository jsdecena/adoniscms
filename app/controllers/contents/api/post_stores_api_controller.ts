import Content from '#models/content'
import { postValidator } from '#validators/post_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostStoresApiController {
  async handle({ response, request }: HttpContext) {
    try {
      const data = request.only(['title', 'body', 'excerpt', 'status', 'visibility', 'type'])
      const validated = await postValidator.validate(data)
      const post = await Content.create({ 
        title: validated.title, 
        body: validated.body, 
        excerpt: validated.excerpt, 
        status: validated.status, 
        visibility: validated.visibility, 
        type: validated.type 
      })
      return response.json(post)
    } catch(error) {
      console.error({ error })
    }
  }
}
