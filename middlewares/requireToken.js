import jwt from 'jsonwebtoken'
import { tokenVerificatonErrors } from '../utils/tokenManager.js'

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization
    if (!token) throw new Error('No token provided in headers')

    token = token.split(' ')[1]
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid

    next()
  } catch (err) {
    return res.status(401).json({ error: tokenVerificatonErrors[err.message] })
  }
}
