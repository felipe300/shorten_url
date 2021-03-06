import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
  const expiresIn = 60 * 10

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (err) {
    console.log(err)
  }
}

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 7

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000)
    })
  } catch (err) {
    console.log(err)
  }
}

export const tokenVerificatonErrors = {
  'invalid signature': 'Invalid token',
  'jwt expired': 'Token expired',
  'invalid token': 'Invalid token',
  'No Bearer': 'No Bearer',
  'jwt malformed': 'Malformed token'
}
