import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profileImageUrl: faker.image.url(),
      email: faker.internet.exampleEmail(),
      password: 'Testing123!!',
      isActive: true
    }
  })
  .build()