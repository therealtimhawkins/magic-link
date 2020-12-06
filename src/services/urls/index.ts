import { nanoid } from 'nanoid'
import Boom from 'boom'
import Url from './url.model'

export const shorten = async (long: string) => {
  try {
    const code = nanoid()
    const url = await Url.query().findOne({ long })
    if (url) return url.short
    const short = `${process.env.BASE_URL}/${code}`
    const count = 0
    await Url.query().insert({ code, long, short, count })
    return short
  } catch (err) {}
}
