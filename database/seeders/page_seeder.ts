import { PageFactory } from '#database/factories/page_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PageFactory.merge({
      title: 'About us'
    }).create()

    await PageFactory.merge({
      title: 'Contact Us'
    }).create()    
  }
}