import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.merge({
      email: 'admin@email.com',
      password: 'Sup3rSecr3t@123!'
    }).create()
  }
}