import fs from 'fs'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'
import pick from 'lodash.pick'
import { SignOptions } from 'jsonwebtoken'

const getPrivateKey = async () => {
  return await fs.readFileSync(__dirname + '/../../../private.key', 'utf8')
}

const getPublicKey = async () => {
  return await fs.readFileSync(__dirname + '/../../../public.key', 'utf8')
}

const getSignOptions = (email: string = '') => {
  const issuer: SignOptions['issuer'] = process.env.JWT_ISSUER || 'magic-link'
  const subject: SignOptions['subject'] = email
  const audience: SignOptions['audience'] =
    process.env.JWT_AUDIENCE || 'open-magic-link'
  const expiresIn: SignOptions['expiresIn'] = process.env.JWT_EXPIRY || '12h'
  const algorithm: SignOptions['algorithm'] = 'RS256'

  return {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm
  }
}

export const buildJwt = async (payload: object, email: string) => {
  const privateKey = await getPrivateKey()
  const signOptions = getSignOptions(email)

  const token = jwt.sign(payload, privateKey, signOptions)
  return token
}

export const verify = async (token: string) => {
  const privateKey = await getPublicKey()
  const signOptions = getSignOptions()
  try {
    const data = await jwt.verify(token, privateKey, signOptions)
    return pick(data, ['uuid'])
  } catch (err) {
    throw Boom.unauthorized()
  }
}
