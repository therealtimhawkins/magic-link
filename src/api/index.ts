import { Router } from 'express'
import auth from '@/api/auth/auth.routes'
import token from '@/api/token/token.routes'

const router = Router()

router.use('/auth', auth)
router.use('/token', token)

export default router
