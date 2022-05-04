import { Router } from 'express'
import { login, register, infoUser, logout, refreshToken }
  from '../controllers/auth.controller.js'

import { requireRefreshToken } from '../middlewares/requireRefreshToken.js'
import { authValidations } from '../middlewares/authValidations.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

router.post('/register', authValidations, register)
authValidations.pop()
router.post('/login', authValidations, login)
router.get('/protected', requireToken, infoUser)
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router
