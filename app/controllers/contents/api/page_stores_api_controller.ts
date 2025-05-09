import Content from '#models/content'
import { pageValidator } from '#validators/page_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class PageStoresApiController {

  async handle({ response, request }: HttpContext) {
    try {
      /**
       * Step 1: Validate input
       */
      const data = request.only(['title', 'body', 'excerpt', 'status', 'visibility', 'type'])

      const validated = await pageValidator.validate(data)

      const page = await Content.create({ 
        title: validated.title, 
        body: validated.body, 
        excerpt: validated.excerpt, 
        status: validated.status, 
        visibility: validated.visibility, 
        type: validated.type 
      })
      
      return response.json(page)
    } catch(error) {
      console.error({ error })
    }
  }  
}