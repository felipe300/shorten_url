import UserSchema from '../models/User.js'

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new UserSchema({ email, password })
    await user.save()
    return res.status(201).json({ ok: true })
  } catch (err) {
    console.log(`Register error: ${err}`)
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
    if (!user) {
      return res.status(403).json({ message: 'User does not exist' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(403).json({ message: 'Incorrect password' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(`Login error: ${err}`)
    return res.status(500).json({ message: 'Error logging in user' })
  }
}
