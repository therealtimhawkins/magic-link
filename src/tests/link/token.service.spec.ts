import sha1 from 'sha1'
import * as Token from '@/api/token/token.service'
const tracker = require('mock-knex').getTracker()

describe('link service', () => {
  describe('createUrl()', () => {
    it('should return full magic link url', async () => {
      tracker.install()
      tracker.on('query', (query: any) => {
        query.response({})
      })

      const link = await Token.createLink('test@gmail.com')
      const { bindings } = tracker.queries.first().mock
      const table = tracker.queries.first().sql.split('`')[1]
      const inputToken = bindings[1]
      const outputToken = link.split('=')[1]

      expect(table).toEqual('tokens')
      expect(tracker.queries.count()).toEqual(1)
      expect(bindings[0]).toEqual('test@gmail.com')
      expect(typeof inputToken).toEqual('string')
      expect(inputToken).toEqual(sha1(outputToken))

      tracker.uninstall()
    })
  })

  describe('createUser()', () => {
    it('adds email and token to user table', async () => {
      tracker.install()
      tracker.on('query', (query: any) => {
        query.response([1])
      })

      const user = await Token.createUser('test@gmail.com')
      const table = tracker.queries.first().sql.split('`')[1]
      const { bindings } = tracker.queries.first().mock
      expect(user).toEqual([1])
      expect(table).toEqual('users')
      expect(bindings[0]).toEqual('test@gmail.com')

      tracker.uninstall()
    })
  })
})
