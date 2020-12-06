import { Model } from 'objection'

class Url extends Model {
  short!: string
  long!: string
  code!: string
  count!: number

  static get tableName() {
    return 'urls'
  }
}

export default Url
