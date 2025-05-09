import { z } from 'zod';

export type Content = {
  id: string
  title: string
  body?: string | null
  excerpt?: string | null
  status?: string
  visibility?: string
  type?: string
  createdAt?: string // or Date if you convert it
  updatedAt?: string | null // or Date if you convert it
};

// ====== ENUM_VISIBILITY
export enum ENUM_VISIBILITY {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export const VISIBILITY = [
  ENUM_VISIBILITY.PUBLIC, 
  ENUM_VISIBILITY.PRIVATE
]
// ====== END ENUM_VISIBILITY

// ====== ENUM_CONTENT_TYPE
export enum ENUM_CONTENT_TYPE {
  POST = 'post',
  PAGE = 'page'
}

export const CONTENT_TYPE = [
  ENUM_CONTENT_TYPE.POST, 
  ENUM_CONTENT_TYPE.PAGE
]
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

export const TPayloadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  status: z.enum([
    ENUM_CONTENT_STATUS.DRAFT, 
    ENUM_CONTENT_STATUS.PUBLISHED, 
    ENUM_CONTENT_STATUS.ARCHIVED
  ]),
  visibility: z.enum([
    ENUM_VISIBILITY.PUBLIC, 
    ENUM_VISIBILITY.PRIVATE
  ]),
  type: z.enum([
    ENUM_CONTENT_TYPE.POST, 
    ENUM_CONTENT_TYPE.PAGE
  ]),
});

export type TPayload = z.infer<typeof TPayloadSchema>;