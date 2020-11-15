import { v4 as uuidv4 } from 'uuid'
import sha1 from 'sha1'
import Boom from '@hapi/boom'
import pick from 'lodash.pick'
import { Link } from './token.types'
import { buildJwt } from '@/services/jwt'
import * as Token from './token.model'
import * as User from '@/api/user/user.model'

export const createLink = async (email: string) => {
  const token = uuidv4()
  await Token.create({
    token: sha1(token),
    email
  })
  const link =
    process.env.LINK_URL + '/magic?token=' + token + '&email=' + email
  return link
}

export const createUser = async (email: string) => {
  const uuid = uuidv4()
  const user = await User.create({ email, uuid })
  return user
}

export const handleTokenData = async (data: Link.Token, email: string) => {
  if (data.email !== email)
    throw Boom.unauthorized('email does not match token')

  const user = await User.get(email)
  if (user) {
    return user
  } else {
    return createUser(email)
  }
}

export const handleLogIn = async (token: string, email: string) => {
  const data = await Token.get(sha1(token))
  if (data) {
    const user = await handleTokenData(data, email)
    const payload = pick(user, ['uuid'])
    return await buildJwt(payload, email)
  } else {
    throw Boom.notFound('token not found')
  }
}
