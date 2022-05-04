import jwt from 'jsonwebtoken'
import { tokenVerificatonErrors } from '../utils/tokenManager.js'

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCokkie = req.cookies?.refreshToken
    if (!refreshTokenCokkie) throw new Error('No refreshToken provided')

    const { uid } = jwt.verify(refreshTokenCokkie, process.env.JWT_REFRESH)
    req.uid = uid
    next()
  } catch (err) {
    return res.status(401).json({ error: tokenVerificatonErrors[err.message] })
  }
}
