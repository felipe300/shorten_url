import { Router } from 'express'
import { validationResultExpress } from '../middlewares/validationResultExpress.js'
import { login, register } from '../controllers/auth.controller.js'
import { validations } from '../utils/authValidations.js'

const router = Router()

router.post('/register', validations, validationResultExpress, register)
validations.pop()
router.post('/login', validations, validationResultExpress, login)

export default router
