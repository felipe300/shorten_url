import { body } from 'express-validator'
import { validationResultExpress } from './validationResultExpress.js'

export const authValidations = [
  body('email', 'invalid email format').trim().isEmail().normalizeEmail(),
  body('password', 'password must have minimun 6 characters')
    .trim()
    .isLength({ min: 6 }),
  body('password', 'invalid password format').custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error('passwords do not match')
    }
    return value
  }),
  validationResultExpress
]
