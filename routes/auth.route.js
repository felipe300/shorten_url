import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validations } from '../utils/authValidations.js'
import { validationResultExpress } from '../middlewares/validationResultExpress.js'

const router = express.Router()

router.post('/register', validations, validationResultExpress, register)
validations.pop()
router.post('/login', validations, validationResultExpress, login)

export default router
