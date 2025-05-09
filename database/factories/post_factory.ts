import factory from '@adonisjs/lucid/factories'
import Content, { ENUM_CONTENT_TYPE } from '#models/content'

export const PostFactory = factory
  .define(Content, async ({ faker }) => {
    return {
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
      type: ENUM_CONTENT_TYPE.POST
    }
  })
  .build()