import { PostFactory } from '#database/factories/post_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PostFactory.merge({
      title: 'About us'
    }).create()

    await PostFactory.merge({
      title: 'Contact Us'
    }).create()    
  }
}