import { CONTENT_STATUS, CONTENT_TYPE, VISIBILITY } from '#models/content'
import vine from '@vinejs/vine'

export const postValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).trim(),
    body: vine.string().minLength(1).trim(),
    excerpt: vine.string().optional().nullable(),
    status: vine.enum(CONTENT_STATUS),
    visibility: vine.enum(VISIBILITY),
    type: vine.enum(CONTENT_TYPE),
  })
)
