import jwt from 'jsonwebtoken'
import UserSchema from '../models/User.js'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js'

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new UserSchema({ email, password })
    await user.save()
    return res.status(201).json({ ok: true })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    return res.status(500).json({ message: 'Error registering user' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserSchema.findOne({ email })
    if (!user) return res.status(403).json({ error: 'User does not exist' })

    const isMatch = await user.comparePassword(password)

    if (!isMatch) return res.status(403).json({ message: 'Incorrect password' })

    const { token, expiresIn } = generateToken(user._id)
    generateRefreshToken(user.id, res)

    return res.status(200).json({ token, expiresIn })
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in user' })
  }
}

export const infoUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.uid).lean()
    return res.status(200).json({ id: user.id, email: user.email })
  } catch (err) {
    return res.status(401).json({ message: 'Error getting user info' })
  }
}

export const refreshToken = (req, res, next) => {
  try {
    const refreshTokenCokkie = req.cookies?.refreshToken
    if (!refreshTokenCokkie) throw new Error('No refreshToken provided')

    const { uid } = jwt.verify(refreshTokenCokkie, process.env.JWT_REFRESH)

    const { token, expiresIn } = generateToken(uid)

    return res.status(200).json({ token, expiresIn })
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
