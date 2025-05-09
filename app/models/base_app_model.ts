import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from '@lukeed/uuid'

export default class BaseAppModel extends BaseModel {
  public static selfAssignPrimaryKey = true
  public static incrementing = false

  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({
    serializeAs: 'created_at',
    autoCreate: true,
  })
  declare createdAt: DateTime

  @column.dateTime({
    serializeAs: 'updated_at',
    autoCreate: true,
    autoUpdate: true,
  })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async setPK<T extends BaseAppModel>(model: T) {
    model.id = uuidv4()
  }
}
