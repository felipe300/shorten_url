import { Router } from 'express'
import { validationResultExpress } from '../middlewares/validationResultExpress.js'
import { login, register, infoUser, refreshToken, logout }
  from '../controllers/auth.controller.js'
import { validations } from '../utils/authValidations.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

router.post('/register', validations, validationResultExpress, register)
validations.pop()
router.post('/login', validations, validationResultExpress, login)
router.get('/protected', requireToken, infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)

export default router
