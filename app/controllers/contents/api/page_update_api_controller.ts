import Content, { ENUM_CONTENT_TYPE } from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PageUpdateApiController {
  async handle({ response }: HttpContext) {
    try {
      const pages = await Content.query().where('type', ENUM_CONTENT_TYPE.PAGE).paginate(1, 100)
      
      return response.json(pages)
    } catch(error) {
      console.error({ error })
    }
  }  
}