import { beforeCreate, beforeSave, column } from '@adonisjs/lucid/orm'
import BaseAppModel from './base_app_model.js'
import { slugify } from '#utils/generator'

// ====== ENUM_VISIBILITY
export enum ENUM_VISIBILITY {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export const VISIBILITY = [ENUM_VISIBILITY.PUBLIC, ENUM_VISIBILITY.PRIVATE]
// ====== END ENUM_VISIBILITY

// ====== ENUM_CONTENT_TYPE
export enum ENUM_CONTENT_TYPE {
  POST = 'post',
  PAGE = 'page'
}

export const CONTENT_TYPE = [ENUM_CONTENT_TYPE.POST, ENUM_CONTENT_TYPE.PAGE]
// ====== END ENUM_CONTENT_TYPE

// ====== ENUM_CONTENT_STATUS
export enum ENUM_CONTENT_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export const CONTENT_STATUS = [
  ENUM_CONTENT_STATUS.DRAFT, 
  ENUM_CONTENT_STATUS.PUBLISHED, 
  ENUM_CONTENT_STATUS.ARCHIVED
]
// ====== END ENUM_CONTENT_STATUS

export default class Content extends BaseAppModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string
  
  @column()
  declare slug: string
  
  @column()
  declare body: string | null
  
  @column()
  declare excerpt: string | null
  
  @column()
  declare status: ENUM_CONTENT_STATUS

  @column()
  declare visibility: ENUM_VISIBILITY

  @column()
  declare type: ENUM_CONTENT_TYPE

  @beforeCreate()
  public static async setSlug(content: Content) {
    content.slug = slugify(content.title)
  }

  @beforeSave()
  public static async updateSlug(content: Content) {
    content.slug = slugify(content.title)
  }  
}