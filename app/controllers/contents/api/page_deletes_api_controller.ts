import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class PageDeletesApiController {
  async handle({ response, params }: HttpContext) {
    try {
      const page = await Content.findOrFail(params.id)
      await page.delete()

      return response.json({
        data: 'Success'
      })
    } catch(error) {
      console.error({ error })
    }
  }  
}