import axios from 'axios'
import { body, param } from 'express-validator'
import { validationResultExpress } from './validationResultExpress.js'

export const authValidations = [
  body('email', 'invalid email format')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'password must have minimun 6 characters')
    .trim()
    .isLength({ min: 6 }),
  body('password', 'invalid password format')
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error('passwords do not match')
      }
      return value
    }),
  validationResultExpress
]

export const paramLinkValidator = [
  param('id', 'invalid id format')
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress
]

export const bodyLinkValidations = [
  body('originLink', 'invalid originLink format')
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith('https://')) {
          value = `https://${value}`
        }
        await axios.get(value)
        return value
      } catch (err) {
        throw new Error('invalid originLink')
      }
    }),

  validationResultExpress
]
